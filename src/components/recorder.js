'use client'

import { useState, useEffect, useRef } from 'react'
import { Mic, StopCircle, AlertCircle, LogOut } from "lucide-react"

export default function TranscripcionVoz() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState(null)
  const [serverResponse, setServerResponse] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const recognitionRef = useRef(null)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onresult = (event) => {
        const result = event.results[event.results.length - 1];
        const transcriptText = result[0].transcript;
        setTranscript(transcriptText);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Error de reconocimiento de voz:', event.error);
        setError(`Error: ${event.error}`);
        setIsListening(false);
      };
    } else {
      setError('Tu navegador no soporta reconocimiento de voz.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const sendTranscription = async (text) => {
    try {
      const response = await fetch("http://localhost:5000/api/transcription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setServerResponse(data.message);
    } catch (error) {
      console.error("Error al enviar la transcripción:", error);
      setError("No se pudo enviar la transcripción");
    }
  };

  useEffect(() => {
    if (transcript) {
      sendTranscription(transcript);
    }
  }, [transcript]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    console.log("Cerrando sesión...");
  };

  const styles = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f0f4f8',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#2c3e50',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
    },
    menuToggle: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    },
    menu: {
      position: 'fixed',
      top: 0,
      left: isMenuOpen ? 0 : '-300px',
      width: '300px',
      height: '100%',
      backgroundColor: '#ffffff',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
      transition: 'left 0.3s ease-in-out',
      zIndex: 1000,
    },
    menuContent: {
      padding: '2rem',
    },
    logoutButton: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem 1rem',
      backgroundColor: '#e74c3c',
      color: '#ffffff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
    },
    contentContainer: {
      display: 'flex',
      flex: 1,
    },
    leftSection: {
      flex: '1',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightSection: {
      flex: '2',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingLeft: '2rem',
    },
    button: {
      width: '220px',
      height: '220px',
      borderRadius: '50%',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#ffffff',
      backgroundColor: '#3498db',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)',
    },
    buttonListening: {
      backgroundColor: '#e74c3c',
      transform: 'scale(1.05)',
    },
    icon: {
      marginBottom: '0.5rem',
      width: '64px',
      height: '64px',
    },
    statusBox: {
      fontSize: '2rem',
      marginBottom: '2rem',
      padding: '1rem',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    transcriptBox: {
      padding: '1.5rem',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginBottom: '2rem',
    },
    errorBox: {
      padding: '1rem',
      backgroundColor: '#fdeded',
      color: '#5f2120',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1rem',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>Habla y Lee</h1>
        <button onClick={toggleMenu} style={styles.menuToggle} aria-label="Abrir menú">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="10" r="3"/>
            <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
          </svg>
        </button>
      </header>
      <div style={styles.menu}>
        <div style={styles.menuContent}>
          <button onClick={handleLogout} style={styles.logoutButton}>
            <LogOut style={{ marginRight: '0.5rem' }} />
            Cerrar sesión
          </button>
        </div>
      </div>
      <div style={styles.contentContainer}>
        <div style={styles.leftSection}>
          <button 
            onClick={toggleListening}
            style={{
              ...styles.button,
              ...(isListening ? styles.buttonListening : {})
            }}
          >
            {isListening ? (
              <>
                <StopCircle style={styles.icon} />
                Detener
              </>
            ) : (
              <>
                <Mic style={styles.icon} />
                Escuchar
              </>
            )}
          </button>
        </div>
        <div style={styles.rightSection}>
          {error && (
            <div style={styles.errorBox}>
              <AlertCircle style={{ marginRight: '0.5rem', color: '#ef5350' }} />
              <span>{error}</span>
            </div>
          )}
          <div style={styles.statusBox}>
            <strong>Estado:</strong> {isListening ? 'Escuchando...' : 'No escuchando'}
          </div>
          <div style={styles.transcriptBox}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2c3e50' }}>Transcripción:</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>{transcript || 'Ninguna transcripción aún'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
