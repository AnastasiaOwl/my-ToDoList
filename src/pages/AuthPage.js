import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../api/api';
import { NavLink, Navigate } from 'react-router-dom';
import '../style/LoginPage.css';

const AuthPage = ({ handleLoginSuccess }) => {
  const [inputEmail, setInputEmail] = useState('');
  const [userNotFound, setUserNotFound] = useState(false); // State to track user not found
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('loggedInUser');
    if (storedEmail) {
      setInputEmail(storedEmail);
      handleLoginSuccess();
    }
  }, [handleLoginSuccess]);

  const handleLogin = async () => {
    if (!inputEmail) {
      setError('Please enter login and email.');
      return;
    }

    try {
      // Check if user already exists
      const users = await getAllUsers();
      const currentUser = users.find((user) => user.email === inputEmail);

      if (currentUser) {
        console.log('User found in database:', currentUser);
        localStorage.setItem('loggedInUser', inputEmail);
        handleLoginSuccess(); // Log in the user
        setInputEmail('');
      } else {
        // User not found, set state to show the message
        setUserNotFound(true);
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError('Error logging in. Please try again.');
    }
    setInputEmail('');
  };

  if (localStorage.getItem('loggedInUser')) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className='login-form'>
        <div className='login-items'>
          <input
            className='inputs'
            type="text"
            placeholder="Email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
          />
          <button className='login-button' onClick={handleLogin}>Login</button> 
          {userNotFound && (
          <p> Sorry, we can't find this user.{' '}
          <NavLink className='link' to='/LoginPage'>Registered?</NavLink>
        </p>
      )}
        </div>
      </div>

     
    </>
  );
};

export default AuthPage;
