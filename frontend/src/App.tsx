import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Collection from './components/Collection';
import CardSet from './components/CardSet';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/cards/:setId" element={<CardSet />} />
        <Route path="/" element={<Collection />} />
      </Routes>
    </Router>
  );
};

export default App;
