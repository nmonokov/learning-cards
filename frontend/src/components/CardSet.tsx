import React, { useState } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import Card from './Card';
import './CardSet.css';
import { CardData, data, } from '../data/cardCollections';

type CardSetParams = {
  setId: string;
};

const getCardData = (id: string): CardData[] => data[id].cards;

const CardSet = () => {
  const { setId } = useParams<CardSetParams>();
  if (!setId) {
    throw Error('Invokes without param');
  }
  const initialCards = getCardData(setId);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentIndex < initialCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === 'right' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

  };

  const navigate = useNavigate();
  const goBack = () => {
    navigate('/'); // Navigate back to the collection page
  };

  const cardsCounter = `${currentIndex + 1} / ${initialCards.length}`;

  return (
    <div className="card-set">
      <div className="card-set-header">
        <i className="fas fa-arrow-left back-icon" onClick={goBack}></i> {/* Back icon */}
        <div className="cards-counter">{cardsCounter}</div>
      </div>
      {initialCards.length > 0 && (
        /* Card component */
        <Card
          key={currentIndex}
          word={initialCards[currentIndex].word}
          translation={initialCards[currentIndex].translation}
          onSwipe={handleSwipe}
          firstCard={currentIndex === 0}
          lastCard={currentIndex === initialCards.length - 1}
        />
      )}
    </div>
  );
};

export default CardSet;
