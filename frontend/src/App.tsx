import React, { useState } from 'react';
import Card from './components/Card';

const initialCards = [
  { word: 'Hello', translation: 'Hola' },
  { word: 'World', translation: 'Mundo' },
  { word: 'World2', translation: 'Mundo2' },
  { word: 'World3', translation: 'Mundo3' },
  { word: 'World4', translation: 'Mundo4' },
  // ... more cards
];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentIndex < initialCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === 'right' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="app">
      <Card
        key={currentIndex}
        word={initialCards[currentIndex].word}
        translation={initialCards[currentIndex].translation}
        onSwipe={handleSwipe}
        firstCard={currentIndex === 0}
        lastCard={currentIndex === initialCards.length - 1}
      />
    </div>
  );
};

export default App;
