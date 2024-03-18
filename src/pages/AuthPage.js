import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../api/api';
import { NavLink, Navigate } from 'react-router-dom';
import { setLoggedInUser } from '../actions/authActions';
import '../style/AuthPage.css';

const AuthPage = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [userNotFound, setUserNotFound] = useState(false);
  const [error, setError] = useState(null);

  // Redux
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const handleLoginSuccess = (email) => {
    dispatch(setLoggedInUser(true)); // Dispatch action to update login status
    localStorage.setItem('loggedInUser', email);
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('loggedInUser');
    if (storedEmail && isLoggedIn) {
      setInputEmail(storedEmail);
    }
  }, [isLoggedIn]);

  const handleLogin = async () => {
    if (!inputEmail) {
      setError('Please enter login and email.');
      return;
    }

    try {
      const users = await getAllUsers();
      const currentUser = users.find((user) => user.email === inputEmail);

      if (currentUser) {
        handleLoginSuccess(inputEmail);
      } else {
        setUserNotFound(true);
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError('Error logging in. Please try again.');
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className='auth-form'>
      <div className='auth-items'>
        <input
          className='auth-inputs'
          type="text"
          placeholder="Email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
        />
        <button className='auth-button' onClick={handleLogin}>Login</button>
        {userNotFound && (
          <p> Sorry, we can't find this user.{' '}
          <NavLink className='auth-link' to='/LoginPage'>Registered?</NavLink>
          </p>
        )}
        {error && <p className='error-message'>{error}</p>}
      </div>
    </div>
  );
};

export default AuthPage;

