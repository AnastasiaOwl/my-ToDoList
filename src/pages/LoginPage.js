import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { addUser, getAllUsers } from '../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser } from '../actions/authActions';
import '../style/LoginPage.css';

const LoginPage = () => {
  const [inputLogin, setInputLogin] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [userExistsError, setUserExistsError] = useState(false);
  const [error, setError] = useState(null);

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
    if (!inputLogin || !inputEmail) {
      setError('Please enter login and email.');
      return;
    }

    try {
      const users = await getAllUsers();
      const currentUser = users.find((user) => user.login === inputLogin && user.email === inputEmail);
      if (currentUser) {
        console.log('User found in database:', currentUser);
        setUserExistsError(true);
      } else {
        const response = await addUser({ login: inputLogin, email: inputEmail });
        if (!response.message) {
          console.log('User added successfully:', response);
          localStorage.setItem('loggedInUser', inputEmail);
          handleLoginSuccess(inputEmail);
          setInputEmail('');
        } else {
          console.error('User addition failed:', response.message || 'Unknown error');
          setError(response.message || 'Unknown error');
        }
    } 
  }
  catch (error) {
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
        <p>Already have registered? Super, go here <NavLink className='login-link' to='/AuthPage'>authorize</NavLink></p>
      </div>
    </div>
  );
};

export default LoginPage;
