import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './components/DarkModeContext';
import Collection from './components/Collection';
import CardSet from './components/CardSet';
import DarkModeToggle from './components/DarkModeToggle';

const App: React.FC = () => {
  return (
    <DarkModeProvider>
      <Router>
        <DarkModeToggle />
        <Routes>
          <Route path="/cards/:setId" element={<CardSet />} />
          <Route path="/" element={<Collection />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
};

export default App;
