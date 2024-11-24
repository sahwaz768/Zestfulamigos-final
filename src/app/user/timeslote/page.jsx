'use client';
import React, { useState, useRef, useEffect } from 'react';

const Page = () => {
  const times = [
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
    '5:00 PM - 6:00 PM',
    '6:00 PM - 7:00 PM',
    '7:00 PM - 8:00 PM',
    '8:00 PM - 9:00 PM'
  ];

  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(null);
  const [purpose, setPurpose] = useState('');
  const [location, setLocation] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dates = Array.from({ length: 4 }, (_, i) => {
    const today = new Date();
    today.setDate(today.getDate() + i);
    return {
      month: today.toLocaleDateString('en-US', { month: 'short' }),
      day: today.toLocaleDateString('en-US', { day: 'numeric' })
    };
  });

  const handleTimeSlotClick = (index) => {
    if (selectedSlots.includes(index)) {
      setSelectedSlots(selectedSlots.filter(slotIndex => slotIndex < index));
    } else if (
      selectedSlots.length === 0 ||
      index === selectedSlots[selectedSlots.length - 1] + 1
    ) {
      setSelectedSlots([...selectedSlots, index]);
    }
  };

  const handleDateClick = (index) => setSelectedDateIndex(index);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate all required fields
    if (
      selectedDateIndex === null ||
      selectedSlots.length === 0 ||
      !purpose ||
      !location ||
      !isConfirmed
    ) {
      setErrorMessage('Please complete all fields before submitting.');
      return;
    }

    // Log the user-provided information
    const selectedDate = dates[selectedDateIndex];
    const selectedTimes = selectedSlots.map((slot) => times[slot]);

    console.log('Selected Date:', `${selectedDate.month} ${selectedDate.day}`);
    console.log('Selected Time Slots:', selectedTimes.join(', '));
    console.log('Purpose:', purpose);
    console.log('Location:', location);
    console.log('Location Confirmation:', isConfirmed);

    // Clear all fields
    setSelectedDateIndex(null);
    setSelectedSlots([]);
    setPurpose('');
    setLocation('');
    setIsConfirmed(false);
    setErrorMessage('');
  };

  return (
    <>
   
    <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
    <div className='flex mx-6'>
      <div className="timeslotebox">
        <h1 className="text-black text-2xl font-semibold my-4">Time Slot and Date Availability</h1>
        <div className="flex">
          {dates.map((date, index) => (
            <div
              key={index}
              className={`divStyle ${selectedDateIndex === index ? 'toggled' : ''}`}
              onClick={() => handleDateClick(index)}
            >
              <p>{date.month}</p>
              <p>{date.day}</p>
            </div>
          ))}
        </div>
        <div className="time-slots-container mt-4">
          {times.map((time, index) => (
            <div
              key={index}
              onClick={() => handleTimeSlotClick(index)}
              className={`time-slot ${selectedSlots.includes(index) ? 'selected' : ''}`}
            >
              {time}
            </div>
          ))}
        </div>
      </div>

      <div className="timeslotebox">
        <h1 className="text-black text-2xl font-semibold my-4">Purpose of Engagement</h1>
        <textarea
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          placeholder="Purpose..."
          className="purposeinput"
          required
        ></textarea>

        <h1 className="my-3">Specify the Location for Companion Meet-Up</h1>
        <LocationInput location={location} setLocation={setLocation} />

        <div className="mt-2 ">
          <input type="checkbox" checked={isConfirmed} onChange={() => setIsConfirmed(!isConfirmed)} />
          <span className="ml-2 text-sm">Confirm the meet-up location</span>
        </div>

        <button type="submit" className="cntbtn3 mt-6">
          Continue
        </button>

        {errorMessage && <p className="error text-xs">{errorMessage}</p>}
      </div>
      </div>
    </form>
   
    </>
  );
};

const LocationInput = ({ location, setLocation }) => {
  const inputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');

  const GOOGLE_API_KEY = 'AIzaSyDzgEHJMuVZWhUtQgNbbuFr3TmJ2v3J96M';

  // Function to handle manual location submission
  const handleManualLocationSubmit = async () => {
    const manualLocation = inputRef.current.value;
    if (!manualLocation) {
      setErrorMessage('Please enter a location.');
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(manualLocation)}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const manualAddress = data.results[0].formatted_address;
        setLocation(manualAddress);
        setErrorMessage(''); // Clear error on successful submission
      } else {
        setErrorMessage('Failed to fetch coordinates for the location.');
      }
    } catch {
      setErrorMessage('Error fetching the location.');
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      const loadGoogleMapsScript = () => {
        return new Promise((resolve, reject) => {
          if (typeof window.google !== 'undefined' && window.google.maps) {
            resolve();
          } else {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
            script.async = true;
            script.onload = resolve;
            script.onerror = () => reject('Google Maps API failed to load.');
            document.body.appendChild(script);
          }
        });
      };

      loadGoogleMapsScript()
        .then(() => {
          if (window.google && inputRef.current) {
            const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
              types: ['(cities)'],
            });

            autocomplete.addListener('place_changed', () => {
              const place = autocomplete.getPlace();
              if (place && place.formatted_address) {
                setLocation(place.formatted_address);
                setErrorMessage(''); // Clear error on selecting from autocomplete
              }
            });
          }
        })
        .catch((error) => setErrorMessage(error));

      // Optional: Clear error message when user starts typing in the input
      const handleInput = () => {
        setErrorMessage('');
      };
      inputRef.current.addEventListener('input', handleInput);

      // Cleanup event listener
      return () => {
        if (inputRef.current) {
          inputRef.current.removeEventListener('input', handleInput);
        }
      };
    }
  }, [setLocation]);

  return (
    <>
      <input ref={inputRef} type="text" placeholder="Enter location" className="meetupinputfield" />
      <button type="button" onClick={handleManualLocationSubmit} className='meet-up-btn'>check</button>
      {location && <p className="text-xs">{location}</p>}
      {errorMessage && <p className="error text-xs">{errorMessage}</p>}
    </>
  );
};

export default Page;

