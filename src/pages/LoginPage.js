import React, { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { addUser, getAllUsers } from '../api/api';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../actions/authActions'; // Import the action
import '../style/LoginPage.css';

const LoginPage = () => {
  const [inputLogin, setInputLogin] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [userExistsError, setUserExistsError] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const storedEmail = localStorage.getItem('loggedInUser');
    if (storedEmail) {
      setInputEmail(storedEmail);
      dispatch(setLoggedInUser(true));
    }
  }, [dispatch]); // Only dispatch is the dependency, not the action itself  

  const handleLogin = async () => {
    if (!inputLogin || !inputEmail) {
      setError('Please enter login and email.');
      return;
    }

    try {
      // Check if user already exists
      const users = await getAllUsers();
      const currentUser = users.find((user) => user.login === inputLogin && user.email === inputEmail);

      if (currentUser) {
        console.log('User found in database:', currentUser);
        setUserExistsError(true);
      } else {
        // Add the user to the database
        const response = await addUser({ login: inputLogin, email: inputEmail });
        console.log('Add user response:', response); // Log the response
        if (response.data && response.data.success) {
          console.log('User added successfully:', response.data);
          localStorage.setItem('loggedInUser', inputEmail);
          dispatch(setLoggedInUser(true)); // Dispatch action to update login status
          setInputEmail('');
        } 
        // else {
        //   console.error('User addition failed:', response.data ? response.data.message : 'Unknown error');
        //   setError(response.data ? response.data.message : 'Unknown error');
        //   console.log('Response object:', response); // Add this line to see the response object
        // }
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError('Error logging in. Please try again.');
    }

    setInputLogin('');
    setInputEmail('');
  };

  return (
    <>
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
    </>
  );
};

export default LoginPage;
