// DeleteConfirmationPopup.jsx
import React from 'react';
import './Popup.css';

function DeleteConfirmationPopup({ onClose, onDelete }) {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <div className='popup'>
      <div className='popup-delete'>
      <img src="src/components/cancelIcon.svg" className='close-dlt-btn' alt="" onClick={onClose}/>
        <div className='popup-heading'>
          <h3>Confirm Deletion</h3>
          {/* <img src="src/components/cancelIcon.svg" className='close-dlt-btn' alt="" onClick={onClose}/> */}
        </div>
        <div className='popup-content'>
          <p>Are you sure you want to delete this task?</p>
          <div className='button-container'>
            <button onClick={handleDelete} className='dlt-btn' >Yes</button>
            <button onClick={onClose} className='dlt-btn'>No</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationPopup;
