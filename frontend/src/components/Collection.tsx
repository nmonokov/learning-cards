import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Collection.css';
import { CollectionData, data } from '../data/cardCollections';
import EditModal from './EditModal';
import ConfirmModal from './ConfirmModal';

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [mode, setMode] = useState('new');
  const [deleteCardSetId, setDeleteCardSetId] = useState('');

  const navigate = useNavigate();
  const cardSets = getCardSets();

  const navigateToCardSet = (target: EventTarget, setId: string) => {
    if ((target as HTMLElement).closest('.edit-button, .delete-button')) {
      return; // Do nothing if the click was on the hint
    }
    navigate(`/cards/${setId}`);
  };

  const openAddNewCardSetModal = () => {
    setMode("new");
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

  const handleEdit = (cardSetId: string) => {
    if (!cardSetId) {
      return;
    }
    setMode("update");
    setCardSetEdit(data[cardSetId]);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (cardSetId: string) => {
    setDeleteCardSetId(cardSetId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteCardSetId) {
      delete data[deleteCardSetId];
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="collection">
      {cardSets.map((set) => (
        <div key={set.id} className="card-set-collection-view-set" onClick={(e) => navigateToCardSet(e.target, set.id)}>
          <div className="card-set-collection-header">
            <div className="edit-button" onClick={() => handleEdit(set.id)}>
              <i className="fas fa-pen"></i> {/* Edit icon */}
            </div>
            <div className="delete-button" onClick={() => handleDeleteClick(set.id)}>
              <i className="fas fa-times"></i> {/* Delete icon */}
            </div>
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
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpsert={handleCardSetUpsert}
        mode={mode}
        data={cardSetEdit}
      />
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Collection;
