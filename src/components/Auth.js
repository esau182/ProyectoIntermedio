// En Auth.js
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSuccessfulLogin = () => {
    onLogin(); // Llama a la función de autenticación desde App
  };

  return (
    <div>
      {isLogin ? (
        <Login onRegisterClick={handleToggle} onLoginSuccess={handleSuccessfulLogin} />
      ) : (
        <Register onLoginClick={handleToggle} />
      )}
    </div>
  );
}
