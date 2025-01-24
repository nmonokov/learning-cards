import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('cognito_id_token');
    if (!isAuthenticated && token) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated, setIsAuthenticated]);

  if (!localStorage.getItem('cognito_id_token')) {
    return <Navigate to="/" replace />;
  }

  return isAuthenticated ? <Outlet /> : <div>Finalizing authentication...</div>;
};

export default ProtectedRoute;