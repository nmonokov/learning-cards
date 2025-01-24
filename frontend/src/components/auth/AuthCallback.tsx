import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { backendAuthentication } from '../../api/auth';
import { storeTokens } from '../../lib/googleToken';
import './AuthCallback.css';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    const code = params.get('code');

    const handleAuth = async () => {
      try {
        if (error){
          console.error('OAuth error:', error);
          navigate('/error?code=auth_failed');
          return;
        }
        const response = await backendAuthentication(code);
        storeTokens(response.data.id_token);
        setIsAuthenticated(true);
        navigate('/dashboard', { replace: true });
      } catch (error: any) {
        if (['Duplicate request detected', 'Authorization code is missing'].includes(error.message)) {
          return;
        }
        console.error('Authentication failed:', error);
        navigate('/error?code=auth_failed');
      }
    };
    handleAuth();
    }, [navigate, setIsAuthenticated]);

  return (
    <div className="auth-callback">
      <div className="auth-callback__loader">
        <div className="auth-callback__spinner"></div>
        <p className="auth-callback__status">Authenticating...</p>
      </div>
    </div>
  );
};

export default AuthCallback;