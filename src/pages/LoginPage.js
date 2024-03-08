import React, { useState,} from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const LoginPage = () => {
  const { login } = useAuth();
  const [inputLogin, setInputLogin] = useState('');
  const [inputEmail, setInputEmail] = useState('');

  const handleLogin = async () => {
    if (!inputLogin || !inputEmail) {
      alert('Please enter login and email.');
      return;
    }

    try {
      const response = await axios.post('/api/login', {
        login: inputLogin,
        email: inputEmail
      });
      if (response.data.success) {
        login();
      } else {
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
    setInputLogin('');
    setInputEmail('');
  };

  return (
    <>
      <input className='input'
        type="text"
        placeholder="Login"
        value={inputLogin}
        onChange={(e) => setInputLogin(e.target.value)}
      />
      <input className='input'
        type="text"
        placeholder="email"
        value={inputEmail}
        onChange={(e) => setInputEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Go</button>
    </>
  );
};

export default LoginPage;
