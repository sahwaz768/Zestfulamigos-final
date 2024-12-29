'use client';
import React from 'react';
import { FaRegBell } from 'react-icons/fa6';
import { GoLocation } from "react-icons/go";
import Sidebar from '@/components/sidebar';
import Image from 'next/image';
import Profile from '@/app/homepageimg.jpg';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { useState } from 'react';
import Companionchatwindow from '@/components/companionchatwindow';
import { RiChatSmile2Line } from 'react-icons/ri';
import { MdOutlineHistory } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
import { CiLogout } from 'react-icons/ci';
import { MdOutlineArrowDropDown } from 'react-icons/md';




const page = () => {

  const handleResize = () => {
    if (window.matchMedia('(min-width: 768px)').matches) {
      showchat1();
    } else {
      showchat();
    }
  };

  const showchat1 = () => {
    document.getElementById('chatwindow').style.display = 'block';
  };

  const showchat = () => {
    document.getElementById('chatlist').style.display = 'none';
    document.getElementById('chatwindow').style.display = 'block';
  };
  return (
    <div>
      <Chatheader2/>
      <div className="chatpage">
        <div>
          <Secondsidebar/>
        </div>
        <div className="chatsection">
          <div className="chatlist" id="chatlist">
            <div className=" chatlistbox">
              <h1 className="">Chats</h1>
            </div>
            <div className="userlistbox">
              <div className="userdetail" onClick={handleResize}>
                <Image src={Profile} alt="profile" />
                <h1 className="ml-2 text-sm">Alisha</h1>
                <div className="userstatus text-xs">today</div>
              </div>
              <div className="userdetail">
                <Image src={Profile} alt="profile" />
                <h1 className="ml-2 text-sm">Berlin</h1>
                <div className="userstatus text-xs">today</div>
              </div>
            </div>
          </div>
          <div className="chatwindow" id="chatwindow">
            <Companionchatwindow/>
          </div>
        </div>
      </div>
    </div>
  )
}


export const Chatheader2 = () => {
  /* logic for nav bar */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to toggle the dropdown notification
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const showsecondnification = () => {
    document.getElementById('hideshow1').style.display = 'none';
    document.getElementById('notification2').style.display = 'block';
  };
  const showthirdnification = () => {
    document.getElementById('hideshow2').style.display = 'none';
    document.getElementById('notification3').style.display = 'block';
  };

  const hideallnotification = () => {
    document.getElementById('notification2').style.display = 'none';
    document.getElementById('notification3').style.display = 'none';
    document.getElementById('hideshow1').style.display = 'block';
    document.getElementById('hideshow2').style.display = 'block';
  };
  return (
    <>
      <div className="swipeheader">
        <header className="header2 ">
          <div className="menu-toggle2" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <div className="logo2 ">zestful amigos</div>

          <nav className={`nav2 ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-list2">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </nav>
          <div className="flex gap-2 mr-4">
            <div className="bellicon" onClick={toggleDropdown}>
              <FaRegBell color="white" size={20} />
            </div>
            <div className="bellicon">
              <CgProfile color="white" size={20} />
            </div>
          </div>
        </header>
      </div>
      <div className="noti-mb-view w-full px-4">
        <div className="threelinembview">
          <Sidebar />
        </div>
        <div className="belmbview " onClick={toggleDropdown}>
          <FaRegBell color="black" size={20} />
        </div>
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="notificationsvg">
            <svg
              width="26"
              height="13"
              viewBox="0 0 26 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M25.5 13H0.5L12.5 0L25.5 13Z" fill="white" />
            </svg>
          </div>
          <div className="notificatioview text-sm text-gray-900">
            <div id="notification1">
              <ul>
                <li>Your slot for companion henry has been confirmed.</li>
                <li>Scheduled from 11.00AM - 1.00PM on 17 Jan</li>
                <li>Scheduled from 11.00AM - 1.00PM on 17 Jan</li>
              </ul>

              <br />
              <hr />
              <div
                className="text-center text-pink-700 p-2 cursor-pointer"
                onClick={showsecondnification}
                id="hideshow1"
              >
                show more notification
              </div>
            </div>
            <div id="notification2">
              <ul>
                <li>
                  this is second notification for companion henry has been
                  confirmed.
                </li>
                <li>Scheduled from 11.00AM - 1.00PM on 17 Jan</li>
                <li>Scheduled from 11.00AM - 1.00PM on 17 Jan</li>
              </ul>

              <br />
              <hr />
              <div
                className="text-center text-pink-700 p-2 cursor-pointer"
                onClick={showthirdnification}
                id="hideshow2"
              >
                show more notification
              </div>
            </div>

            <div id="notification3">
              <ul>
                <li>
                  this is third notification for companion henry has been
                  confirmed.
                </li>
                <li>Scheduled from 11.00AM - 1.00PM on 17 Jan</li>
                <li>Scheduled from 11.00AM - 1.00PM on 17 Jan</li>
              </ul>

              <br />
              <hr />
              <div
                className="text-center text-pink-700 p-2 cursor-pointer"
                onClick={hideallnotification}
              >
                Hide all notification
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export const Secondsidebar = () => {
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
    <div>
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
                <div className="menu-item-second flex ml-4">
                  <CgProfile color="black" size={20} />
                  <span className="menu-label-second">Profile Settings</span>
                </div>
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
    </div>
  )
}







export default page
