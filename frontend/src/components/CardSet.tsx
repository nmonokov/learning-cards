import React, { useState } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import Card from './Card';
import './CardSet.css';
import { CardData, data, } from '../data/cardCollections';
import { getBookmarkedCards } from './Collection';

type CardSetParams = {
  setId: string;
};

const getCardData = (id: string): CardData[] => data[id].cards;

const updateCards = (id: string, updatedCards: CardData[]): void => {
  data[id].cards = updatedCards;
}

const findSetIdByBookMarkedWord = (word: string, translation: string) => {
  const result = Object.entries(data).find(([_, collection]) =>
    collection.cards.find((card: CardData) =>
      card.word === word
      && card.translation === translation
      && card.bookmarked
    ));
  return result ? result[0] : '';
}

const CardSet = () => {
  const { setId } = useParams<CardSetParams>();
  if (!setId) {
    throw Error('Invokes without param');
  }
  const initialCards = setId === 'bookmarks' ? getBookmarkedCards() : getCardData(setId);
  const [cards, setCards] = useState(initialCards);
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

  const handleBookmarkToggle = (word: string, translation: string) => {
    let id = setId;
    let cardData = initialCards;
    if (setId === 'bookmarks') {
      id = findSetIdByBookMarkedWord(word, translation);
      cardData = getCardData(id)
    }
    const updatedCards: CardData[] = cardData.map((card: CardData) =>
      card.word === word ? {...card, bookmarked: !card.bookmarked} : card,
    );
    updateCards(id, updatedCards);
    setCards(updatedCards);
  };

  const handleShuffleCards = () => {
    const shuffleCards = [...initialCards].sort(() => Math.random() - 0.5);
    setCards(shuffleCards);
    updateCards(setId, shuffleCards);
    setCurrentIndex(0);
  }

  const cardsCounter = `${currentIndex + 1} / ${initialCards.length}`;

  return (
    <div className="card-set">
      <div className="card-set-header">
        <i className="fas fa-arrow-left back-icon" onClick={goBack}></i> {/* Back icon */}
        <div className="cards-counter">{cardsCounter}</div>
        {setId !== 'bookmarks' ?
          <i className="fas fa-random shuffle-icon" onClick={handleShuffleCards}></i>
          : ''}
      </div>
      {initialCards.length > 0 && (
        /* Card component */
        <Card
          key={currentIndex}
          word={cards[currentIndex].word}
          translation={cards[currentIndex].translation}
          onSwipe={handleSwipe}
          firstCard={currentIndex === 0}
          lastCard={currentIndex === cards.length - 1}
          onBookmarkToggle={handleBookmarkToggle}
          isCurrentlyBookmarked={cards[currentIndex].bookmarked}
        />
      )}
    </div>
  );
};

export default CardSet;
