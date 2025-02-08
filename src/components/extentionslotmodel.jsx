'use client';
import React, { useState } from 'react';

const Extensionbtn = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [error, setError] = useState('');

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setError(''); // Clear the error if a slot is selected
  };

  const handleSubmit = () => {
    if (!selectedSlot) {
      setError('Please select a slot before submitting.');
      return;
    }

    console.log(`Selected slot: ${selectedSlot}`);
    setError('');
  };
  const Slots = Array.from({ length: 3 }, (_, i) => i + 1);

  return (
    <>
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
    </>
  );
};

export default Extensionbtn;
