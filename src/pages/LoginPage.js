import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { addUser, getAllUsers } from '../api/api';
import '../style/LoginPage.css';

const LoginPage = ({ handleLoginSuccess }) => {
  const [inputLogin, setInputLogin] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [userExistsError, setUserExistsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('loggedInUser');
    if (storedEmail) {
      setInputEmail(storedEmail);
      handleLoginSuccess();
    }
  }, [handleLoginSuccess]);

  const handleLogin = async () => {
    if (!inputLogin || !inputEmail) {
      setError('Please enter login and email.');
      return;
    }

    try {
      // Check if user already exists
      const users = await getAllUsers();
      const currentUser = users.find(user => user.login === inputLogin && user.email === inputEmail);

      if (currentUser) {
        setUserExistsError(true);
      } else {
        // Add the user to the database
        const response = await addUser({ login: inputLogin, email: inputEmail });
        if (response.data && response.data.success) {
          localStorage.setItem('loggedInUser', inputEmail);
          handleLoginSuccess(); // Call the onLoginSuccess function passed from App.js
          setInputEmail('');
        } else {
          setError(response.data ? response.data.message : 'Unknown error');
        }
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError('Error logging in. Please try again.');
    }

    setInputLogin('');
    setInputEmail('');
  };

  return (
    <div className='login-form'>
      <div className='login-items'>
        <input
          className='inputs'
          type="text"
          placeholder="Login"
          value={inputLogin}
          onChange={(e) => setInputLogin(e.target.value)}
        />
        <input
          className='inputs'
          type="text"
          placeholder="Email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
        />
        <button className='login-button' onClick={handleLogin}>SignIn</button>
        {userExistsError && (
          <p className='error-message'>User with this login and email already exists.</p>
        )}
        {error && <p className='error-message'>{error}</p>}
        <p>Already registered? Go to <NavLink className='login-link' to='/AuthPage'>authorization</NavLink></p>
      </div>
    </div>
  );
};

export default LoginPage;


