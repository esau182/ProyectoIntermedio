import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import LogoTraductor from './Img/LogoTraductor.png'; // Ajusta la ruta si es necesario

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/register', {
        username,
        password,
      });
      setMessage('Registro exitoso');
      navigate('/login'); // Redirige al login después de un registro exitoso
    } catch (error) {
      setMessage(error.response?.data.error || 'Error en el registro');
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #4b6cb7, #182848)', 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div style={{ 
        display: 'flex', 
        width: '85%', 
        maxWidth: '1000px', 
        borderRadius: '1rem', 
        overflow: 'hidden', 
        backdropFilter: 'blur(10px)', 
        background: 'rgba(255, 255, 255, 0.1)', 
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' 
      }}>
        
        {/* Imagen de fondo */}
        <div
          style={{
            flex: 1,
            backgroundImage:
              "url(https://media.istockphoto.com/id/1422998870/es/foto/el-concepto-de-software-para-la-traducci%C3%B3n-entre-diferentes-idiomas-la-persona-trabaja-en-la.jpg?s=612x612&w=0&k=20&c=R0DKt-c5WeYtFD_337Ssvcf4tMyu4FL186IUgzGuvHg=)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        
        {/* Sección de registro */}
        <div style={{ 
          flex: 1, 
          backgroundColor: 'rgba(255, 255, 255, 0.15)', 
          padding: '2.5rem', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          borderRadius: '1rem', 
          backdropFilter: 'blur(10px)', 
          boxShadow: '0px 4px 8px rgba(255, 255, 255, 0.1)' 
        }}>
          <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
            {/* Imagen del logo con fondo circular */}
            <img
              src={LogoTraductor}
              alt="Logo Traductor"
              style={{
                width: "150px",
                marginBottom: "1rem",
                borderRadius: "50%",
      
              }}
            />
            <h5 style={{ color: '#ddd', marginBottom: '1.5rem' }}>Crea una cuenta nueva</h5>
          </div>

          <div style={{ width: '80%' }}>
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                backdropFilter: 'blur(10px)',
              }}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                backdropFilter: 'blur(10px)',
              }}
            />
            <button
              onClick={handleRegister}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: 'none',
                backgroundColor: 'rgba(51, 51, 51, 0.8)',
                color: '#fff',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              Registrarse
            </button>
          </div>

          {message && <p style={{ color: '#f00', marginTop: '1rem' }}>{message}</p>}

          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: '#ddd' }}>
              ¿Ya tienes una cuenta? <Link to="/login" style={{ color: '#93a5ef', textDecoration: 'none' }}>Inicia sesión aquí</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

