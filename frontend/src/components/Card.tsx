import React, { useState } from 'react';
import './Card.css';

type CardProps = {
  word: string;
  translation: string;
  onSwipe: (direction: 'left' | 'right') => void;
  firstCard: boolean;
  lastCard: boolean;
  onBookmarkToggle: (word: string, translation: string) => void;
  isCurrentlyBookmarked?: boolean;
};

const Card: React.FC<CardProps> = ({
   word,
   translation,
   onSwipe,
   firstCard,
   lastCard,
   onBookmarkToggle,
   isCurrentlyBookmarked,
}) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [dragDelta, setDragDelta] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [bookMarked, setBookmarked] = useState<boolean>(isCurrentlyBookmarked || false);

  const swipeThreshold = 200; // Swipe threshold

  const handleGestureStart = (clientX: number) => {
    setStartX(clientX);
    setIsDragging(true);
  };

  const handleGestureMove = (clientX: number) => {
    if (isDragging) {
      const deltaX = clientX - startX;
      setDragDelta(deltaX);

      if (Math.abs(deltaX) > swipeThreshold) {
        // Trigger swipe and disable further dragging
        onSwipe(deltaX > 0 ? 'right' : 'left');
        setIsDragging(false);
        setDragDelta(0);
      }
    }
  };

  const handleGestureEnd = () => {
    setIsDragging(false);
    setDragDelta(0);
  };

  const handleFlip = (target: EventTarget, clientX: number) => {
    if ((target as HTMLElement).closest('.hint-button, .hint-text, .bookmark-button')) {
      return; // Do nothing if the click was on the hint
    }
    if (Math.abs(startX - clientX) < 1) {
      setIsFlipped(!isFlipped);
    }
  }

  const handleHintClick = () => {
    setShowHint(!showHint);
  };

  const getHint = (text: string) => {
    return text.charAt(0) + '_'.repeat(text.length - 1);
  };

  const handleBookmarkClick = () => {
    setBookmarked(!bookMarked);
    onBookmarkToggle(word, translation);
  };

  const dragTransform = `translateX(${dragDelta}px)`;
  const flippedTransform = `rotateY(${isFlipped ? 180 : 0}deg)`;
  const cardStyle = {
    transform: `${dragTransform} ${flippedTransform}`,
    transition: isDragging ? 'none' : 'transform 0.6s' };
  const backCardOpacity = Math.abs(dragDelta) / swipeThreshold;
  const backCardVisibility = (firstCard && dragDelta > 0) || (lastCard && dragDelta < 0) ? 'hidden': 'visible';
  return (
    <div
      className="card-container"
      onMouseDown={(e) => handleGestureStart(e.clientX)}
      onMouseMove={(e) => handleGestureMove(e.clientX)}
      onMouseUp={handleGestureEnd}
      onClick={(e) => handleFlip(e.target, e.clientX)}
    >
      <div
        className="background-card"
        style={{
          opacity: backCardOpacity,
          visibility: backCardVisibility,
        }}
      >
      </div>
      <div className={`card ${isFlipped ? 'flipped' : ''}`} style={cardStyle}>
        <div className="card-front">
          {word}
          {!showHint ? (
            <div className="hint-button" onClick={handleHintClick}>
              <i className="far fa-lightbulb"></i> hint
            </div>
          ) : (
            <div className="hint-text" onClick={handleHintClick}>
              <i className="fas fa-lightbulb"></i> {getHint(translation)}
            </div>
          )}
          {bookMarked ? (
            <div className="bookmark-button" onClick={handleBookmarkClick}>
              <i className="fas fa-bookmark"></i>
            </div>
          ) : (
            <div className="bookmark-button" onClick={handleBookmarkClick}>
              <i className="fa-regular fa-bookmark"></i>
            </div>
          )}

        </div>
        <div className="card-back">{translation}</div>
      </div>
    </div>
  );
};

export default Card;
