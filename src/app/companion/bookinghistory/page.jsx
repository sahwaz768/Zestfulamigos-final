'use client';
import React, { useState } from 'react';
import Profile from '@/app/homepageimg.jpg';
import { RiChatSmile2Line } from 'react-icons/ri';
import { MdOutlineHistory } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import Image from 'next/image'
import { Chatheadersecond } from '../dashboard/page';
import { Chatsideicon2 } from '../dashboard/page';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { IoCalendarOutline } from 'react-icons/io5';
import { PiTimerThin } from 'react-icons/pi';
import { GrTransaction } from 'react-icons/gr';
import { RiServiceLine } from 'react-icons/ri';
import { MdPendingActions } from 'react-icons/md';
import { FaRegStar } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { CiLogout } from 'react-icons/ci';


const Page = () => {
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
      <Chatheadersecond />
      <div className="bookingbox">
        <Chatsideiconsecond/>
        <div className="booking-side">
          <div className="booking-type">
            <div
              className="text-sm font-bold flex  items-center"
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


export const Chatsideiconsecond = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const toggleSidebar = () => {
    if (isSidebarExpanded) {
      setIsSettingsOpen(false); // Close dropdown when sidebar is collapsed
    }
    setIsSidebarExpanded(!isSidebarExpanded);
  };
  return (
    <>
      <div
        className={`sidebar-second ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => {
          setIsSidebarExpanded(false);
          setIsSettingsOpen(false); // Close dropdown on sidebar collapse
        }}
      >
        <div className="menu-container-second">
          {/* Profile */}
          <div className="menu-item-second-x">
            <div className="icon-container-second">
              <Image src={Profile} alt="profile" />
            </div>
            <div className="menu-label-second ">
              <span className="">Olivia Rhye</span>
              <p className="text-xs text-gray-600">Olivia@gmail.com</p>
            </div>
          </div>

          {/* Refresh */}
          <div className="menu-item-second">
            <div className="icon-container-second">
              <RiChatSmile2Line color="black" size={20} />
            </div>
            <span className="menu-label-second">Chat</span>
          </div>

          {/* History */}
          <div className="menu-item-second">
            <div className="icon-container-second">
              <MdOutlineHistory color="black" size={20} />
            </div>
            <span className="menu-label-second">Booking history</span>
          </div>

          {/* Settings */}
          <div className="menu-item-second" onClick={toggleSettings}>
            <div className="icon-container-second">
              <IoSettingsOutline color="black" size={20} />
            </div>
            <span className="menu-label-second">Settings</span>
            <div className="arrow-down">
              <MdOutlineArrowDropDown color="black" size={25} />
            </div>
          </div>

          {isSettingsOpen && (
            <div className="submenu ">
              <div className="">
                
              </div>
              <div className="menu-item-second flex ml-4 mt-2">
                <CiLogout color="black" size={20} />
                <span className="menu-label-second">Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
