'use client';
import React from 'react';
import { Chatheader2 } from '../chat/page';
import { Chatsideicon2 } from '../dashboard/page';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { IoCalendarOutline } from 'react-icons/io5';
import { PiTimerThin } from 'react-icons/pi';
import { GrTransaction } from 'react-icons/gr';
import { RiServiceLine } from 'react-icons/ri';
import { MdPendingActions } from 'react-icons/md';
import { FaRegStar } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

const Page = () => {
  const showupcomingbooking = () => {
    document.getElementById('closed-booking-box').style.display = 'none';

    document.getElementById('upcoming-booking-box').style.display = 'block';
  };
  const showcompletedbooking = () => {
    document.getElementById('closed-booking-box').style.display = 'block';

    document.getElementById('upcoming-booking-box').style.display = 'none';
  };
  return (
    <div>
      <Chatheader2 />
      <div className="bookingbox">
        <Chatsideicon2 />
        <div className="booking-side">
          <div className="booking-type">
            <div
              className="text-sm font-bold flex  items-center"
              onClick={showupcomingbooking}
            >
              Upcoming <IoIosArrowRoundForward size={20} />
            </div>
            <div
              className="text-sm font-bold flex items-center"
              onClick={showcompletedbooking}
            >
              History <IoIosArrowRoundForward size={20} />
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
                  <RiServiceLine /> <h1>Service booked</h1>
                </div>
                <div className="flex mt-4 text-sm gap-2 items-center">
                  <MdPendingActions />
                  <h1>Status: Upcoming</h1>
                </div>
                <div className="flex mt-4 text-sm gap-2 items-center">
                <CiLocationOn />
                  <h1>Meetup Location: Mumbai</h1>
                </div>
               
              </div>
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
                <FaRegStar />
                  <h1>Rate given: 4/5</h1>
                </div>
                <div className="flex mt-4 text-sm gap-2 items-center">
                  <RiServiceLine /> <h1>Service booked</h1>
                </div>
                <div className="flex mt-4 text-sm gap-2 items-center">
                  <MdPendingActions />
                  <h1>Status: completed</h1>
                </div>
                
                <div>
                  <button>Rate</button>
               
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
