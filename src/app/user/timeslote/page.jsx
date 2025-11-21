'use client';
import React, { useState, useEffect } from 'react';
import { Guidmodel } from '@/components/Models';
import Chatheader from '@/components/Masterheader';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { generateStimeSlots, parseTimeSlot } from '@/utils/bookings.utils';
import Threeline from '@/components/ThreeLine';
import LocationAccess from '@/components/Locationaccess';
import { getTodayIndex } from '@/utils/bookings.utils';
import { filterScheduleByDay } from '@/utils/bookings.utils';
import { convertArrayToIndexedObject } from '@/utils/bookings.utils';
import { replaceTimeslots } from '@/utils/bookings.utils';
import { mergeTimeSlots } from '@/utils/bookings.utils';
import Loadingbar from '@/components/Loadingbar';

const Page = () => {
  const [bookedSlots, setBookedSlots] = useState({});
  const [validBookingDates, setValidBookingDates] = useState(null);
  const [generatedDates, setGeneratedDates] = useState([]);
  const [isLoadingDates, setIsLoadingDates] = useState(false);

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
          setIsLoadingDates(false);
          if (data) {
            setIsLoadingDates(true);

            const bookSlots = {};
            data.bookedslots.forEach((l) => {
              const todaydate = new Date().getDate();
              const start = Number(l.start);
              const end = Number(l.end);
              const getCurrentIndex = new Date(start).getDate() - todaydate;
              const generatedTimeslots = generateStimeSlots(start, end);

              bookSlots[getCurrentIndex] = bookSlots[getCurrentIndex]
                ? [...bookSlots[getCurrentIndex], ...generatedTimeslots]
                : generatedTimeslots;
            });

            const todayIndex = getTodayIndex();
            const apiAvaliablityData = data.companionslots;
            const filterAvaliableData = filterScheduleByDay(
              todayIndex,
              apiAvaliablityData
            );
            const convertedAvaliableData =
              convertArrayToIndexedObject(filterAvaliableData);
            const replacedAvailableSlots = replaceTimeslots(
              convertedAvaliableData
            );
            const merged = mergeTimeSlots(replacedAvailableSlots, bookSlots);

            const validbookingdates = data.validbookingdates;
            console.log('validbookingdates:', validbookingdates);

            // Store the valid booking dates
            if (validbookingdates === null) {
              setValidBookingDates(null);
              setGeneratedDates([]);
            } else {
              setValidBookingDates(validbookingdates);
              // Generate dates based on startDate and endDate
              const dates = generateDateRange(
                validbookingdates.startDate,
                validbookingdates.endDate
              );
              setGeneratedDates(dates);
            }

            setBookedSlots(merged);
          }
        });
    }
  }, []);

  const generateDateRange = (startDateMs, endDateMs) => {
    if (!startDateMs || !endDateMs) {
      return [];
    }

    const startDate = new Date(Number(startDateMs));
    const endDate = new Date(Number(endDateMs));
    const today = new Date();

    // Reset time to start of day for accurate comparison
    today.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const actualStartDate = startDate > today ? startDate : today;

    if (endDate < actualStartDate) {
      return [];
    }
    // Calculate the number of days between start and end (inclusive)
    const daysDifference =
      Math.ceil((endDate - actualStartDate) / (1000 * 60 * 60 * 24)) + 1;

    return Array.from({ length: daysDifference }, (_, i) => {
      const currentDate = new Date(actualStartDate);
      currentDate.setDate(actualStartDate.getDate() + i);
      return {
        month: currentDate.toLocaleDateString('en-US', { month: 'short' }),
        monthTime: currentDate.getMonth() + 1,
        day: currentDate.toLocaleDateString('en-US', { day: 'numeric' }),
        fullDate: currentDate // Store full date for reference
      };
    });
  };

  const tokenredux = useSelector((state) => state.AuthReducer.data);
  const [isLoading, setisLoading] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [purpose, setPurpose] = useState('');
  const [location, setLocation] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [modelopen, setModelopen] = useState(true);

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
      const selectedDate = generatedDates[selectedDateIndex];
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

      const { bookaCompanionService } = await import(
        '../../../services/user/bookings.service'
      );
      const { toast } = await import('@/utils/reduxtrigger.utils');
      const { data, error } = await bookaCompanionService(values);
      if (data) {
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
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: './aboutus' },
    { name: 'Privacy Policy', href: './privacypolicy' },
    { name: 'Contact', href: './contactus' }
  ];

  if (isLoadingDates === false) {
    return (
      <>
        <Loadingbar />
      </>
    );
  }

  return (
    <>
      <Threeline />
      <Chatheader
        backgroundColor="rgba(250, 236, 236, 0.8)"
        navLinks={navLinks}
      />
      {modelopen && <Guidmodel closeModal={() => setModelopen(false)} />}
      <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
        <div className="timeslote-box ">
          <div className="timeslotebox ">
            <h1 className="text-black md:text-2xl font-semibold my-4 md:ml-10 ml-4 timeslote-text">
              Time Slot and Date Availability
            </h1>
            <div className="flex md:ml-8 ml-3">
              {generatedDates.map((date, index) => (
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
              {!Array.isArray(generatedDates) || generatedDates.length === 0 ? (
                <>
                  <div className=" bg-white flex items-center justify-center p-6">
                    <div className="w-full max-w-md">
                      {/* Header section */}
                      <div className="text-center mb-12">
                        {/* Icon circle */}
                        <div className="mb-8 inline-flex">
                          <div className="w-20 h-20 bg-red-400 rounded-full flex items-center justify-center">
                            <svg
                              className="w-10 h-10 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl font-bold text-black mb-3">
                          Service Unavailable
                        </h1>

                        {/* Description */}
                        <p className="text-gray-600 text-base">
                          Companion is temporarily offline. We're working to
                          restore service.
                        </p>
                      </div>

                    
                    </div>
                  </div>
                </>
              ) : (
                (times ?? []).map((time, index) => {
                  const slotStartTime = parseTimeSlot(time);
                  const isPast = new Date() > slotStartTime;

                  // Clamp selectedDateIndex to a valid range
                  const safeIndex = Math.min(
                    Math.max(0, selectedDateIndex ?? 0),
                    generatedDates.length - 1
                  );

                  const selectedDayStr = generatedDates[safeIndex]?.day; // e.g. "6"
                  const selectedDay = Number(selectedDayStr);

                  const selectedBookedSlot = bookedSlots?.[safeIndex];
                  const disabledSlot = Array.isArray(selectedBookedSlot)
                    ? selectedBookedSlot.includes(time)
                    : false;

                  return (
                    <button
                      key={index}
                      onClick={(e) => handleTimeSlotClick(e, index)}
                      disabled={
                        (isPast && new Date().getDate() === selectedDay) ||
                        disabledSlot
                      }
                      className={`time-slot ${selectedSlots.includes(index) ? 'selected' : ''}`}
                    >
                      {time}
                    </button>
                  );
                })
              )}
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
              {isLoading ? 'Please wait....' : 'Continue'}
            </button>

            {errorMessage && <p className="error text-xs">{errorMessage}</p>}
          </div>
        </div>
      </form>
    </>
  );
};

export default Page;
