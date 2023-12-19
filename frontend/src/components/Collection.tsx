import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Collection.css';
import { CollectionData, data } from '../data/cardCollections';
import AddCardSetModal from './AddCardSetModal';

export const getCardSets = () => Object.entries(data).map(([id, collection]) => {
  return {
    id,
    name: collection.name,
    description: collection.description,
  };
});

const Collection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const cardSets = getCardSets();

  const navigateToCardSet = (setId: string) => {
    navigate(`/cards/${setId}`);
  };

  const openAddNewCardSetModal = () => {
    setIsModalOpen(true);
  };

  const handleNewCardSetAdd = (newData: any) => {
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

  return (
    <div className="collection">
      {cardSets.map((set) => (
        <div key={set.id} className="card-set-collection-view-set" onClick={() => navigateToCardSet(set.id)}>
          <h3>{set.name}</h3>
          <p>{set.description}</p>
        </div>
      ))}
      <div className="card-set-new" onClick={openAddNewCardSetModal}>
        <div className="add-new-content">
          <i className="fas fa-plus"></i>
        </div>
      </div>
      <AddCardSetModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAdd={handleNewCardSetAdd}
      />
    </div>
  );
};

export default Collection;
