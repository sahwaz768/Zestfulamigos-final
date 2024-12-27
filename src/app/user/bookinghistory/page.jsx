'use client';
import React, { useState } from 'react';
import { Chatheader, Chatsideicon } from '../chat/page';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { IoCalendarOutline } from 'react-icons/io5';
import { PiTimerThin } from 'react-icons/pi';
import { GrTransaction } from 'react-icons/gr';
import { RiServiceLine } from 'react-icons/ri';
import { MdPendingActions } from 'react-icons/md';
import { MdOutlinePaid } from 'react-icons/md';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';

const page = () => {
  const [isOpen, setIsOpen] = useState(false);

  const showUpcomingBooking = () => {
    document.getElementById('closed-booking-box').style.display = 'none';
    document.getElementById('up-coming').classList.add('up-coming');
    document.getElementById('his-tory').classList.remove('his-tory');
    document.getElementById('upcoming-booking-box').style.display = 'block';
  };

  const handleClick = () => {
    showUpcomingBooking();
  };

  const showcompletedbooking = () => {
    document.getElementById('closed-booking-box').style.display = 'block';
    document.getElementById('up-coming').classList.remove('up-coming');
    document.getElementById('upcoming-booking-box').style.display = 'none';
    document.getElementById('his-tory').classList.add('his-tory');

  };
  return (
    <div>
      <Chatheader />
      <div className="bookingbox">
        <Chatsideicon />
        <div className="booking-side">
          <div className="booking-type">
            <div
              className="text-sm font-bold flex items-center "
              onClick={handleClick}
              id='up-coming'
            >
              Upcoming
            </div>

            <div
              className="text-sm font-bold flex items-center"
              onClick={showcompletedbooking}
              id='his-tory'
            >
              History 
            </div>
          </div>
          <div className="booking-box">
            <div className="upcoming-booking-box" id="upcoming-booking-box">
              <div className="upcoming-slot">
                <h1 className="text-sm font-bold text-gray-500">
                  Upcoming meting with sandhiya
                </h1>
                <div className="flex mt-4 gap-8">
                  <div className="flex items-center text-sm gap-2">
                    <IoCalendarOutline />
                    <h1>Thus,oct 24</h1>
                  </div>
                  <div className="flex items-center text-sm gap-2">
                    <PiTimerThin />
                    <h1>11.00AM-12.00PM</h1>
                  </div>
                </div>
                <div className="flex mt-4 text-sm gap-2 items-center">
                  <GrTransaction />
                  <h1>Transaction id: 123456789</h1>
                </div>
                <div className="flex mt-4 text-sm gap-2 items-center">
                  <RiServiceLine /> <h1>Service booked</h1>
                </div>
                <div className="flex mt-4 text-sm gap-2 items-center">
                  <MdPendingActions />
                  <h1>Status: completed</h1>
                </div>
                <div className="flex mt-4 text-sm gap-2 items-center">
                  <MdOutlinePaid />
                  <h1>Paid amount: 2000INR</h1>
                </div>
                <div>
                  <button onClick={() => setIsOpen(true)}>cancel</button>
                </div>
              </div>

              {isOpen && (
                <div className="modal-overlay-cancel">
                  <div
                    className="modal-container-cancel"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className="close" onClick={() => setIsOpen(false)}>
                      &times;
                    </button>
                    <div className="modal-content-cancel flex justify-center">
                      <div>
                        <h2 className=" text-lg font-bold text-center">
                          Are you sure ?
                        </h2>
                        <button className="yes">Yes</button>
                        <button className="no" onClick={() => setIsOpen(false)}>
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="closed-booking-box" id="closed-booking-box">
              <div className="upcoming-slot">
                <h1 className="text-sm font-bold text-gray-500">
                  Completed meting with sandhiya
                </h1>
                <div className="flex mt-4 gap-8">
                  <div className="flex items-center text-sm gap-2">
                    <IoCalendarOutline />
                    <h1>Thus,oct 24</h1>
                  </div>
                  <div className="flex items-center text-sm gap-2">
                    <PiTimerThin />
                    <h1>11.00AM-12.00PM</h1>
                  </div>
                </div>
                <div className="flex mt-4 text-sm gap-2 items-center">
                  <GrTransaction />
                  <h1>Transaction id: 123456789</h1>
                </div>
                <div className="flex mt-4 text-sm gap-2 items-center">
                  <RiServiceLine /> <h1>Service booked</h1>
                </div>
                <div className="flex mt-4 text-sm gap-2 items-center">
                  <MdPendingActions />
                  <h1>Status: completed</h1>
                </div>
                <div className="flex mt-4 text-sm gap-2 items-center">
                  <MdOutlinePaid />
                  <h1>Paid amount: 2000INR</h1>
                </div>
                <div>
                  <button>Rate</button>
                  <button className="md:ml-4 ml-1">Book again</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
