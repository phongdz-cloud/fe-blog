import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const location = useLocation();
  const isAuth = isAuthenticated();

  if (isAuth) {
    // If user is already authenticated, redirect to dashboard
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthRoute;
