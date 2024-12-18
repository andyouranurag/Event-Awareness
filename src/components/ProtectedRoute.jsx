import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // If no token, redirect to the login page
    return <Navigate to="/" />;
  }

  // Otherwise, render the protected content (EventForm)
  return children;
};

export default ProtectedRoute;
