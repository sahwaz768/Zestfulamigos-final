'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Guidmodel } from '../chat/page';
import Chatheader from '@/components/Masterheader';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { generateStimeSlots, parseTimeSlot } from '@/utils/bookings.utils';
import Threeline from '@/components/ThreeLine';
import LocationAccess from '@/components/Locationaccess';

const Page = () => {
  const [bookedSlots, setBookedSlots] = useState({});
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
  const router = useRouter();

  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let companionId = params.get('companionId');
    if (companionId) {
      import('@/services/user/companionDetails.service')
        .then(({ checkCompanionSlots }) => checkCompanionSlots(companionId))
        .then(({ data }) => {
          if (data) {
            const bookSlots = {};
            data.forEach((l) => {
              const todaydate = new Date().getDate();
              const start = Number(l.start);
              const end = Number(l.end);
              const getCurrentIndex = new Date(start).getDate() - todaydate;
              bookSlots[getCurrentIndex] = generateStimeSlots(start, end);
            });
            setBookedSlots(bookSlots);
          }
        });
    }
  }, []);
  const tokenredux = useSelector((state) => state.AuthReducer.data);
  const [isLoading, setisLoading] = useState(false);

  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [purpose, setPurpose] = useState('');
  const [location, setLocation] = useState(null);
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

  const handleTimeSlotClick = (e, index) => {
    e.preventDefault();
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
    setisLoading(() => true);

    if (
      selectedDateIndex === null ||
      selectedSlots.length === 0 ||
      !purpose ||
      !location ||
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
      const { toast } = await import('@/utils/reduxtrigger.utils');
      const { data, error } = await bookaCompanionService(values);
      if (data) {
        console.log(data);

        router.push(`./payment?bookingId=${data.bookingid}`);
        setisLoading(() => false);
      } else {
        toast.error(error);
      }
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
      <Threeline />
      <Chatheader
        backgroundColor="rgba(250, 236, 236, 0.8)"
        navLinks={navLinks}
      />
      <Guidmodel />
      <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
        <div className="timeslote-box ">
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
              {times.map((time, index) => {
                const slotStartTime = parseTimeSlot(time);
                const isPast = new Date() > slotStartTime;
                const selected = dates[selectedDateIndex]?.day;
                const selectedBookedSlot = bookedSlots[selectedDateIndex];
                let disabledSlot = false;
                if (selectedBookedSlot) {
                  disabledSlot = selectedBookedSlot.includes(time);
                }
                return (
                  <button
                    disabled={
                      (isPast && new Date().getDate() == selected) ||
                      disabledSlot
                    }
                    key={index}
                    onClick={(e) => handleTimeSlotClick(e, index)}
                    className={`time-slot ${selectedSlots.includes(index) ? 'selected' : ''}`}
                  >
                    {time}
                  </button>
                );
              })}
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
            <LocationAccess setLocation={setLocation} />
            <div className="mt-2 ">
              <input
                type="checkbox"
                checked={isConfirmed}
                disabled={!location}
                onChange={() => setIsConfirmed(!isConfirmed)}
                id="check"
              />
              <span className="ml-2 text-sm " htmlFor='check'>
                Confirm the meet-up location
              </span>
            </div>

            <button type="submit" className="cntbtn3 mt-6" disabled={isLoading}>
              {isLoading ? 'Please wait....' : 'Countinue'}
            </button>

            {errorMessage && <p className="error text-xs">{errorMessage}</p>}
          </div>
        </div>
      </form>
    </>
  );
};

// const LocationInput = ({ location, setLocation }) => {
//   const inputRef = useRef(null);
//   const [errorMessage, setErrorMessage] = useState("");

//   const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_KEY;

//   const handleManualLocationSubmit = async () => {
//     const manualLocation = inputRef.current.value;
//     if (!manualLocation) {
//       setErrorMessage("Please enter a location.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(manualLocation)}&key=${GOOGLE_API_KEY}`
//       );
//       const data = await response.json();

//       if (data.results && data.results.length > 0) {
//         const address = data.results[0].formatted_address;
//         setLocation(address); // ✅ Store only the string
//         setErrorMessage("");
//       } else {
//         setErrorMessage("Failed to fetch coordinates for the location.");
//       }
//     } catch {
//       setErrorMessage("Error fetching the location.");
//     }
//   };

//   useEffect(() => {
//     if (inputRef.current) {
//       const loadGoogleMapsScript = () => {
//         return new Promise((resolve, reject) => {
//           if (typeof window.google !== "undefined" && window.google.maps) {
//             resolve();
//           } else {
//             const script = document.createElement("script");
//             script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
//             script.async = true;
//             script.onload = resolve;
//             script.onerror = () => reject("Google Maps API failed to load.");
//             document.body.appendChild(script);
//           }
//         });
//       };

//       loadGoogleMapsScript()
//         .then(() => {
//           if (window.google && inputRef.current) {
//             const autocomplete = new window.google.maps.places.Autocomplete(
//               inputRef.current,
//               { types: ["(cities)"] }
//             );

//             autocomplete.addListener("place_changed", () => {
//               const place = autocomplete.getPlace();
//               if (place && place.formatted_address) {
//                 setLocation(place.formatted_address); // ✅ Store only the address
//                 setErrorMessage("");
//               } else {
//                 setErrorMessage("Invalid location. Please select a valid place.");
//               }
//             });
//           }
//         })
//         .catch((error) => setErrorMessage(error));

//       // Clear error when user types
//       const handleInput = () => setErrorMessage("");
//       inputRef.current.addEventListener("input", handleInput);

//       return () => {
//         if (inputRef.current) {
//           inputRef.current.removeEventListener("input", handleInput);
//         }
//       };
//     }
//   }, [setLocation]);

//   return (
//     <>
//       <input ref={inputRef} type="text" placeholder="Enter location" className="meetupinputfield" />
//       <button type="button" onClick={handleManualLocationSubmit} className="meet-up-btn">
//         Check
//       </button>
//       {location && typeof location === "string" && <p className="text-xs">{location}</p>}
//       {errorMessage && <p className="error text-xs">{errorMessage}</p>}
//     </>
//   );
// };

export default Page;
