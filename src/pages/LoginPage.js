import React, { useState } from 'react';
import { addUser, getAllUsers} from '../api/api'; // Import your addUser function
import '../style/LoginPage.css'

const LoginPage = ({ handleLoginSuccess}) => {
  const [inputLogin, setInputLogin] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [error, setError] = useState(null);

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
        console.log('User found in database:', currentUser);
        handleLoginSuccess(); // Log in the user
      } else {
        // Add the user to the database
        const response = await addUser({ login: inputLogin, email: inputEmail });
        if (response.data && response.data.success) {
          console.log('User added successfully:', response.data);
          handleLoginSuccess(); // Call the onLoginSuccess function passed from App.js
        } else {
          console.error('User addition failed:', response.data ? response.data.message : 'Unknown error');
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
      <button className='login-button' onClick={handleLogin}>Login</button>
       </div>
      </div>
    </>
  );
};

export default LoginPage;

