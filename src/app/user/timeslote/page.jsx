'use client';
import React, { useState, useRef, useEffect } from 'react';

const page = () => {
  const times = [
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
    '5:00 PM - 6:00 PM',
    '6:00 PM - 7:00 PM',
    '7:00 PM - 8:00 PM',
    '8.00 PM - 9.00PM'
  ];

  const [selectedSlots, setSelectedSlots] = useState([]); // Track multiple selected slots

  // Function to handle consecutive selection and deselection of time slots
  const handleTimeSlotClick = (index) => {
    // If the clicked slot is already selected, deselect it and all following slots
    if (selectedSlots.includes(index)) {
      const updatedSlots = selectedSlots.filter(
        (slotIndex) => slotIndex < index
      );
      setSelectedSlots(updatedSlots);
    }
    // If no slots are selected or the clicked slot is the next consecutive one, select it
    else if (
      selectedSlots.length === 0 ||
      index === selectedSlots[selectedSlots.length - 1] + 1
    ) {
      setSelectedSlots([...selectedSlots, index]);
    }
  };

  // Generate an array of the next 3 days with separate month and day
  const getNextThreeDays = () => {
    const today = new Date();
    return Array.from({ length: 4 }, (_, i) => {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      // Extract month and day separately
      const optionsMonth = { month: 'short' };
      const optionsDay = { day: 'numeric' };
      return {
        month: nextDay.toLocaleDateString('en-US', optionsMonth),
        day: nextDay.toLocaleDateString('en-US', optionsDay)
      };
    });
  };

  const dates = getNextThreeDays();
  const [selectedDateIndex, setSelectedDateIndex] = useState(null);

  // Function to handle date selection
  const handleDateClick = (index) => {
    setSelectedDateIndex(index);
  };
  return (
    <>
      <div className="flex">
        <div className="timeslotebox">
          <div className="slotebox">
            <h1 className="text-black text-2xl font-semibold my-4">
              time slote and date avaliabilty
            </h1>
            <div className="flex">
              {dates.map((date, index) => (
                <div
                  key={index}
                  className={`divStyle ${selectedDateIndex === index ? 'toggled' : ''}`}
                  onClick={() => handleDateClick(index)} // Fixed the date click handler
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
                  onClick={() => handleTimeSlotClick(index)} // Fixed the time slot click handler
                  className={`time-slot ${selectedSlots.includes(index) ? 'selected' : ''}`}
                >
                  {time}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="timeslotebox">
          <div className="slotebox">
            <h1 className="text-black text-2xl font-semibold my-4">
              Purpose of Engegment
            </h1>

            <div className="mt-6 flex justify-center items-center">
              <textarea
                placeholder="Purpose..."
                className="purposeinput"
              ></textarea>
            </div>
            <h1 className="my-3">Specify the location for Companion meet-up</h1>
            <div className="mt-4 meet-up ">
            <Locationinput />
            </div>
           
            <div className="mt-10">
              <div className=" cntbtn3">
                <div>Countinue</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

const Locationinput = () => {
  const inputRef = useRef(null); // Ref for input field
  const [location, setLocation] = useState(''); // Store the manually entered or selected location
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

      // Clear error message and location when user starts typing in the input
      inputRef.current.addEventListener('input', () => {
        setErrorMessage('');
        setLocation(''); // Clear location on input change
      });
    }
  }, []);
  return (
    <>
      
      <input ref={inputRef} type="text" placeholder="Enter location"  className='meetupinputfield'/>

      <button onClick={handleManualLocationSubmit}>Submit</button>

      {location && <p className='text-xs'>{location}</p>}

      {errorMessage && <p className="error text-xs">{errorMessage}</p>}
<div className='mt-2'>
      <input type='checkbox' />
      <span className='ml-2 text-sm'>Confirm the meet-up location</span>
      </div>
    </>
  );
};
