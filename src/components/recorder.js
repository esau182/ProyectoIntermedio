'use client'

import { useState, useEffect, useRef } from 'react';
import { Mic, StopCircle, AlertCircle, LogOut, Globe } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function TranscripcionVozConTraduccion() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [translation, setTranslation] = useState('');
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'es-ES';

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
        setError(`Error de reconocimiento: ${event.error}`);
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

  const translateText = async (text) => {
    setIsTranslating(true);
    setError(null);
    try {
      const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=en&dt=t&q=${encodeURIComponent(text)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data && data[0] && data[0][0] && data[0][0][0]) {
        setTranslation(data[0][0][0]);
      } else {
        throw new Error('No se recibió una traducción válida');
      }
    } catch (error) {
      console.error("Error en la traducción:", error);
      setError(`Error de traducción: ${error.message}`);
      setTranslation(`[Translation failed] ${text}`);
    } finally {
      setIsTranslating(false);
    }
  };

  const sendTranscriptionAndTranslate = async (text) => {
    try {
      await fetch("https://proyectointermedio-1asdas.onrender.com/api/transcription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      await translateText(text);
    } catch (error) {
      console.error("Error al procesar:", error);
      setError(`Error al procesar: ${error.message}`);
    }
  };

  useEffect(() => {
    if (transcript) {
      sendTranscriptionAndTranslate(transcript);
    }
  }, [transcript]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const styles = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.8), rgba(155, 89, 182, 0.8))',
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
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#2c3e50',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
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
      width: '250px',
      height: '100%',
      background: 'linear-gradient(135deg, #000000, #3498db)', // Gradiente de negro a azul
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
      transition: 'left 0.3s ease-in-out',
      zIndex: 1000,
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Centrar los elementos en la barra lateral
      justifyContent: 'center', // Centrar verticalmente los elementos
    },
    
    menuContent: {
      padding: '1rem',
      color: '#fff', // Color del texto en la barra lateral
      textAlign: 'center', // Centrar el texto
    },
    logoutButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.5rem 1rem',
      backgroundColor: '#e74c3c',
      color: '#ffffff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease',
      width: '100%',
    },
    logoutButtonHover: {
      backgroundColor: '#c0392b',
    },
    contentContainer: {
      display: 'flex',
      flex: 1,
      padding: '1rem',
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
      width: '200px',
      height: '200px',
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
      width: '50px',
      height: '50px',
    },
    statusBox: {
      fontSize: '1.8rem',
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
        <h1 style={styles.title}>VoxTranslate</h1>
        <button style={styles.menuToggle} onClick={toggleMenu}>
          <Globe size={32} />
        </button>
      </header>

      <nav style={styles.menu}>
        <div style={styles.menuContent}>
          <h2>Opciones</h2>
          <button style={styles.logoutButton} onClick={handleLogout}>
            <LogOut size={20} /> Cerrar sesión
          </button>
        </div>
      </nav>

      <div style={styles.contentContainer}>
        <div style={styles.leftSection}>
          <button 
            style={{ ...styles.button, ...(isListening ? styles.buttonListening : {}) }} 
            onClick={toggleListening}
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
              <AlertCircle size={20} style={{ marginRight: '0.5rem' }} />
              {error}
            </div>
          )}
          <div style={styles.statusBox}>
            {isListening ? 'Escuchando...' : 'Listo para escuchar'}
          </div>
          <div style={styles.transcriptBox}>
            <h3>Transcripción:</h3>
            <p>{transcript || 'No hay transcripción disponible'}</p>
            <h3>Traducción:</h3>
            <p>{translation || 'No hay traducción disponible'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
