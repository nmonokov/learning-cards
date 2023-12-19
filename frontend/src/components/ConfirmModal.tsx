import React from 'react';

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={`confirm-modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <p>Are you sure you want to delete this card set?</p>
        <div className="confirm-buttons-layout">
          <button className="cancel" onClick={onClose}>Cancel</button>
          <button className="confirm" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
