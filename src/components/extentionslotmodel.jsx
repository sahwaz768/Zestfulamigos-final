'use client';
import React, { useState } from 'react';

const Extensionbtn = ({ closeModal, bookingid }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [error, setError] = useState('');

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setError(''); // Clear the error if a slot is selected
  };

  const handleSubmit = async () => {
    if (!selectedSlot) {
      setError('Please select a slot before submitting.');
      return;
    }
    try {
      const { extendCurrentSession } = await import(
        '../services/sessions/usersessions.service'
      );
      const values = {
        bookingid: bookingid?.id,
        extentedhours: selectedSlot
      };
      const { data } = await extendCurrentSession(values);
      if (data) {
        closeModal();
      } else {
        console.log('Error Occured');
        closeModal();
      }
    } catch (error) {}
    console.log(`Selected slot: ${selectedSlot}`);
    setError('');
  };
  const Slots = Array.from({ length: 3 }, (_, i) => i + 1);

  return (
    <div className="extension-modal-overlay">
      <div className="extension-modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h1 className="text-2xl">slot extension</h1>
        <h1 className="text-xl text-center my-4">Extent your duration</h1>
        <div className="slot-extension-btn">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {Slots.map((l) => (
              <button
                key={l}
                className={`extent-slot-button ${selectedSlot === l ? 'selected' : ''}`}
                onClick={() => handleSlotClick(l)}
              >
                {l} HOUR
              </button>
            ))}
          </div>
          <br />

          {error && <p className="text-sm text-gray-600">{error}</p>}
          <button className="extention-submit-button" onClick={handleSubmit}>
            Requested access
          </button>
          <h1 className="text-center text-sm text-gray-600">
            Your Request is under process
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Extensionbtn;
