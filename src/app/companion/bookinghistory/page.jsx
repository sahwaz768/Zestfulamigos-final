'use client';
import React from 'react';
import Chatheader from '@/components/Masterheader';
import Notify from '@/components/Notify';
import { IoCalendarOutline } from 'react-icons/io5';
import { PiTimerThin } from 'react-icons/pi';
import { RiServiceLine } from 'react-icons/ri';
import { MdPendingActions } from 'react-icons/md';
import { FaRegStar } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { CompanionNotification } from '../chat/page';
import Sidebar from '@/components/sidebar';
import { navLinks } from 'src/utils/constants.js';
import { companionsidebarlink } from 'src/utils/constants.js';
import { companionsidebardetail } from 'src/utils/constants.js';


const Page = () => {
  const showupcomingbooking = () => {
    document.getElementById('closed-booking-box').style.display = 'none';
    document.getElementById('upcomingbtn').classList.add('bottomline');
    document.getElementById('historybtn').classList.remove('bottomline2');
    document.getElementById('upcoming-booking-box').style.display = 'block';
  };
  const showcompletedbooking = () => {
    document.getElementById('closed-booking-box').style.display = 'block';
    document.getElementById('upcomingbtn').classList.remove('bottomline');
    document.getElementById('historybtn').classList.add('bottomline2');
    document.getElementById('upcoming-booking-box').style.display = 'none';
  };

  const links = navLinks; 
  const companionmenulink = companionsidebarlink; 
const companiondetail = companionsidebardetail; 
  return (
    <div>
      <Chatheader rightElement={< CompanionNotification />}  backgroundColor="rgba(250, 236, 236, 0.8)" navLinks={links}   />
      <div className='notifymbsecond'>
      <Notify backgroundColor='transparent' color='black'/>
      </div>
      <div className="bookingbox">
      <Sidebar menuItems={companionmenulink}  user={companiondetail}/>
        <div className="booking-side">
          <div className="booking-type">
            <div
              className="text-sm font-bold flex  items-center"
              id="upcomingbtn"
              onClick={showupcomingbooking}
            >
              Upcoming
            </div>
            <div
              className="text-sm font-bold flex items-center bottomline2"
               id="historybtn"
              onClick={showcompletedbooking}
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
