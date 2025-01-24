import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './components/darkmode/DarkModeContext';
import { AuthProvider } from './components/auth/AuthProvider';
import ProtectedRoute from './components/layout/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import AuthCallback from './components/auth/AuthCallback';
import Dashboard from './components/dashboard/Dashboard';
import CardSet from './components/cards/CardSet';
import DarkModeToggle from './components/darkmode/DarkModeToggle';

const App: React.FC = () => {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <Router>
          <DarkModeToggle />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cards/:setId" element={<CardSet />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </DarkModeProvider>
  );
};

export default App;
