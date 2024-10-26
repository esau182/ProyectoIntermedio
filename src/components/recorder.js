import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [visualizerData, setVisualizerData] = useState(new Uint8Array(0));
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      const chunks = [];
      mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
        setAudioURL(URL.createObjectURL(blob));
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      visualize();
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  const visualize = () => {
    if (!analyserRef.current) return;

    analyserRef.current.fftSize = 256;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateVisualizer = () => {
      analyserRef.current.getByteFrequencyData(dataArray);
      setVisualizerData(dataArray);
      animationRef.current = requestAnimationFrame(updateVisualizer);
    };

    updateVisualizer();
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Grabador de Audio</h2>
      <div style={{ width: '100%', height: '60px', backgroundColor: '#f0f0f0', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
        {visualizerData.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%', width: '100%' }}>
            {Array.from(visualizerData).map((value, index) => (
              <div
                key={index}
                style={{
                  width: '2px',
                  backgroundColor: '#007bff',
                  margin: '0 1px',
                  height: `${value / 2}%`,
                }}
              ></div>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '15px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isRecording ? (
          <>
            <Square style={{ marginRight: '8px' }} /> Detener Grabación
          </>
        ) : (
          <>
            <Mic style={{ marginRight: '8px' }} /> Iniciar Grabación
          </>
        )}
      </button>
      {audioURL && (
        <audio src={audioURL} controls style={{ width: '100%', marginTop: '15px' }} />
      )}
      {isRecording && (
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', color: '#007bff' }}>
          <Loader2 style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }} />
          Grabando...
        </div>
      )}
    </div>
  );
}

