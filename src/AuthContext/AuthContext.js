import React, { createContext, useState, useEffect } from 'react';
import { getAllUsers } from '../api/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    try {
      const users = await getAllUsers();
      const currentUser = users.find(user => user.login === "inputLogin" && user.email === "inputEmail");
      if (currentUser) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking login:', error.message);
      setIsLoggedIn(false);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('loggedInUser');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLoginSuccess, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
