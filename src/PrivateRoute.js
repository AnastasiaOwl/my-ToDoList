import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/LoginPage" replace />;
  }
  return <>{children}</>;
};

export default PrivateRoute;