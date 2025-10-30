'use client';
import React, { useState, useEffect } from 'react';
import { Guidmodel } from '@/components/Models';
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
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
    '5:00 PM - 6:00 PM',
    '6:00 PM - 7:00 PM',
    '7:00 PM - 8:00 PM',
    '8:00 PM - 9:00 PM',
    '9:00 PM - 10:00 PM',
    '10:00 PM - 11:00 PM'
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
              const generatedTimeslots = generateStimeSlots(start, end);
              
              bookSlots[getCurrentIndex] = bookSlots[getCurrentIndex]
                ? [...bookSlots[getCurrentIndex], ...generatedTimeslots]
                : generatedTimeslots;
            });
            console.log('booked slote:', bookSlots);
            
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
  const [modelopen, setModelopen] = useState(true);

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

    setisLoading(() => true);
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
    //  console.log(values);
      const { bookaCompanionService } = await import(
        '../../../services/user/bookings.service'
      );
      const { toast } = await import('@/utils/reduxtrigger.utils');
      const { data, error } = await bookaCompanionService(values);
      if (data) {
       // console.log(data);

        router.push(`./payment?bookingId=${data.bookingid}`);
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
    } finally {
      setisLoading(() => false);
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
      {modelopen && <Guidmodel closeModal={() => setModelopen(false)}/>}
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
              <span className="ml-2 text-sm " htmlFor="check">
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

export default Page;
