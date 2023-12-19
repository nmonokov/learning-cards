import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Collection.css';
import { CollectionData, data } from '../data/cardCollections';
import CardModal from './CardModal';

export const getCardSets = () => Object.entries(data).map(([id, collection]) => {
  return {
    id,
    name: collection.name,
    description: collection.description,
  };
});

const Collection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardSetEdit, setCardSetEdit] = useState({});

  const navigate = useNavigate();

  const cardSets = getCardSets();

  const navigateToCardSet = (target: EventTarget, setId: string) => {
    if ((target as HTMLElement).closest('.edit-button')) {
      return; // Do nothing if the click was on the hint
    }
    navigate(`/cards/${setId}`);
  };

  const openAddNewCardSetModal = () => {
    setIsModalOpen(true);
  };

  const handleCardSetUpsert = (newData: any) => {
    const newSet: CollectionData = {
      name: newData.name,
      description: newData.description,
      cards: newData.words,
    }
    const key: string = newData.key;
    data[key] = newSet
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (cardSetId: string) => {
    if (!cardSetId) {
      return;
    }
    setCardSetEdit(data[cardSetId]);
    setIsModalOpen(true);
  };

  return (
    <div className="collection">
      {cardSets.map((set) => (
        <div key={set.id} className="card-set-collection-view-set" onClick={(e) => navigateToCardSet(e.target, set.id)}>
          <div className="edit-button" onClick={() => handleEdit(set.id)}>
            <i className="fas fa-pen"></i> {/* Using Font Awesome pen icon */}
          </div>
          <h3>{set.name}</h3>
          <p>{set.description}</p>
        </div>
      ))}
      <div className="card-set-new" onClick={openAddNewCardSetModal}>
        <div className="add-new-content">
          <i className="fas fa-plus"></i>
        </div>
      </div>
      <CardModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onUpsert={handleCardSetUpsert}
        data={cardSetEdit}
      />
    </div>
  );
};

export default Collection;
