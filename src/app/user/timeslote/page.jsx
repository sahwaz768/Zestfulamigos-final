'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Guidmodel } from '../chat/page';
import Chatheader from '@/components/Masterheader';
import { Notification } from '../swipepage/page';
import { redirect } from 'next/dist/server/api-utils';
import withAuth from '@/app/hoc/wihAuth';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';


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

  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let companionId = params.get('companionId');
    if (!companionId) {
      redirect('/');
    }
  }, []);
  const tokenredux = useSelector((state) => state.AuthReducer.data);

  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(null);
  const [purpose, setPurpose] = useState('');
  const [location, setLocation] = useState({
    lat: 19.05444444,
    lng: 72.84055556,
    state: 'Maharashtra',
    city: 'Mumbai'
  });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dates = Array.from({ length: 4 }, (_, i) => {
    const today = new Date();
    today.setDate(today.getDate() + i);
    return {
      month: today.toLocaleDateString('en-US', { month: 'short' }),
      monthTime: today.getMonth() + 1,
      day: today.toLocaleDateString('en-US', { day: 'numeric' })
    };
  });

  const handleTimeSlotClick = (index) => {
    if (selectedSlots.includes(index)) {
      setSelectedSlots(selectedSlots.filter((slotIndex) => slotIndex < index));
    } else if (
      selectedSlots.length === 0 ||
      index === selectedSlots[selectedSlots.length - 1] + 1
    ) {
      setSelectedSlots([...selectedSlots, index]);
    }
  };

  const handleDateClick = (index) => setSelectedDateIndex(index);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      selectedDateIndex === null ||
      selectedSlots.length === 0 ||
      !purpose ||
      Object.values(location).length < 2 ||
      !isConfirmed
    ) {
      setErrorMessage('Please complete all fields before submitting.');
      return;
    }

    try {
      const params = new URL(document.location.toString()).searchParams;
      const companionId = params.get('companionId');
      const { formatBookingDate } = await import(
        '../../../utils/bookings.utils'
      );
      const selectedDate = dates[selectedDateIndex];
      const selectedTimes = selectedSlots.map((slot) => times[slot]);
      const { formattedDate, totalDuration } = formatBookingDate(
        selectedDate.monthTime,
        selectedDate.day,
        selectedTimes
      );
      const values = {
        userId: tokenredux.userId,
        companionId,
        purpose,
        bookingdate: formattedDate,
        bookingduration: totalDuration,
        bookingdurationUnit: 'HOUR',
        bookinglocation: location
      };
      console.log(values);
      const { bookaCompanionService } = await import(
        '../../../services/user/bookings.service'
      );
      const { data } = await bookaCompanionService(values);
      console.log(data);
      router.push(`./payment?bookingId=${data.bookingid}`);
    } catch (err) {
      console.log(err);
      setSelectedDateIndex(null);
      setSelectedSlots([]);
      setPurpose('');
      setIsConfirmed(false);
      setErrorMessage('');
    }
    // Clear all fields
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: './aboutus' },
    { name: 'Privacy Policy', href: './privacypolicy' },
    { name: 'Contact', href: './contactus' }
  ];

  return (
    <>
      <Chatheader
        rightElement={<Notification />}
        backgroundColor="rgba(250, 236, 236, 0.8)"
        navLinks={navLinks}
      />
      <Guidmodel />
      <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-wrap ">
          <div className="timeslotebox ">
            <h1 className="text-black md:text-2xl font-semibold my-4 md:ml-10 ml-4 timeslote-text">
              Time Slot and Date Availability
            </h1>
            <div className="flex md:ml-8 ml-3">
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
            <div className="time-slots-container mt-4 md:ml-6 ml-3">
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

          <div className="timeslotebox timeslote-textarea">
            <h1 className="text-black md:text-2xl font-semibold my-4">
              Purpose of Engagement
            </h1>
            <textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Purpose..."
              className="purposeinput"
              required
            ></textarea>

            <h1 className="my-3 text-sm">
              Specify the Location for Companion Meet-Up
            </h1>
            {/* <LocationInput location={location} setLocation={setLocation} /> */}

            <div className="mt-2 ">
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={() => setIsConfirmed(!isConfirmed)}
              />
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

  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_KEY;

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
            const autocomplete = new window.google.maps.places.Autocomplete(
              inputRef.current,
              {
                types: ['(cities)']
              }
            );

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
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter location"
        className="meetupinputfield"
      />
      <button
        type="button"
        onClick={handleManualLocationSubmit}
        className="meet-up-btn"
      >
        check
      </button>
      {location && <p className="text-xs">{location}</p>}
      {errorMessage && <p className="error text-xs">{errorMessage}</p>}
    </>
  );
};

export default withAuth(Page);
