import React, { useEffect } from 'react';
import { useAuth } from '../components/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const { handleLogin, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="landing-page">
      <div className="landing-page__card">
        <h1 className="landing-page__title">
          Language Learning Cards
        </h1>
        <p className="landing-page__subtitle">
          Master new languages through interactive flash cards
        </p>
        <GoogleLoginButton onClick={handleLogin} />
      </div>
    </div>
  );
};

export default LandingPage;