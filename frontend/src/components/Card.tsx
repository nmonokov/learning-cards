import React, { useState } from 'react';
import './Card.css';

type CardProps = {
  word: string;
  translation: string;
  onSwipe: (direction: 'left' | 'right') => void;
  firstCard: boolean;
  lastCard: boolean;
};

const Card: React.FC<CardProps> = ({
   word,
   translation,
   onSwipe,
   firstCard,
   lastCard,
}) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [dragDelta, setDragDelta] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

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
        setDragDelta(0); // Reset dragDelta after swipe
      }
    }
  };

  const handleGestureEnd = () => {
    if (Math.abs(dragDelta) < 10) {
      setIsFlipped(!isFlipped);  // Flip the card on a click (not drag)
    }
    setIsDragging(false);
    setDragDelta(0); // Reset dragDelta when gesture ends
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
      className={`card-container`}
      onMouseDown={(e) => handleGestureStart(e.clientX)}
      onMouseMove={(e) => handleGestureMove(e.clientX)}
      onMouseUp={handleGestureEnd}
    >
      <div
        className={`background-card`}
        style={{
          opacity: backCardOpacity,
          visibility: backCardVisibility,
        }}
      >
      </div>
      <div className={`card ${isFlipped ? 'flipped' : ''}`} style={cardStyle}>
        <div className="card-front">{word}</div>
        <div className="card-back">{translation}</div>
      </div>
    </div>
  );
};

export default Card;
