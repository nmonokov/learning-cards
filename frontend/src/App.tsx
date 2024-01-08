import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './components/darkmode/DarkModeContext';
import DarkModeToggle from './components/darkmode/DarkModeToggle';
import Collection from './components/cards/Collection';
import CardSet from './components/cards/CardSet';

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
