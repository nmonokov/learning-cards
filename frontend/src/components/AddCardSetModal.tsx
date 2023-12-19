import React, { useState } from 'react';
import './AddCardSetModal.css';

type AddCardSetModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newSet: any) => void;
};

const AddCardSetModal: React.FC<AddCardSetModalProps> = ({ isOpen, onClose, onAdd  }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [words, setWords] = useState<string>('');
  const [error, setError] = useState<string>('');

  const processWords = (wordsString: string): { word: string; translation: string }[] => {
    return wordsString.split('\n')
      .map(line => line.trim())
      .filter(line => line.includes('-'))
      .map(line => {
        const [word, translation] = line.split('-').map(part => part.trim());
        return { word, translation };
      });
  };

  const validateFields = (): boolean => {
    if (!name.trim() || !description.trim() || !words.trim()) {
      setError('All fields are required.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = () => {
    if (!validateFields()) {
      return;
    }
    const key = name.replace(/\s+/g, '').toLowerCase();
    const newWords = processWords(words);
    const newCardSet = {
      key,
      name,
      description,
      words: newWords,
    };
    onAdd(newCardSet);
    onClose();
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} onMouseDown={handleOutsideClick}>
      <div className="modal-content">
        {error && <div className="error-message">{error}</div>}
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <textarea placeholder="Words" value={words} onChange={(e) => setWords(e.target.value)} ></textarea>
        <div className="modal-buttons">
          <button className="cancel" onClick={onClose}>Cancel</button>
          <button className="add" onClick={handleSubmit}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddCardSetModal;
