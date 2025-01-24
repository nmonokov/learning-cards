import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { clearTokens, googleLogin, isTokenValid } from '../../lib/googleToken';

type AuthContextType = {
  handleLogin: () => void;
  handleLogout: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('cognito_id_token')
  );
  const handleLogin = useCallback(() => {
    setIsAuthenticated(false);  // Reset state during login attempt
    googleLogin();
  }, []);

  const handleLogout = useCallback(() => {
    clearTokens();
    setIsAuthenticated(false);
    window.location.href = '/';
  }, []);

  const value = useMemo(() => ({
    handleLogin,
    handleLogout,
    isAuthenticated,
    setIsAuthenticated,
  }), [handleLogin, handleLogout, isAuthenticated, setIsAuthenticated]);

  // Add listener for storage changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('cognito_id_token');
      const hasToken = !!token;
      if (hasToken !== isAuthenticated) {
        setIsAuthenticated(hasToken && !isTokenValid(token));
      }
    };

    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);