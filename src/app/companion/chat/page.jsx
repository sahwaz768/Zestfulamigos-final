'use client';

import Image from 'next/image';
import Profile from '@/app/homepageimg.jpg';
import Companionchatwindow from '@/components/companionchatwindow';
import Chatheader from '@/components/Masterheader';
import { CgProfile } from 'react-icons/cg';
import React, { useState } from 'react';
import { FaRegBell } from 'react-icons/fa6';
import { MdLogout, MdOutlineReportProblem } from 'react-icons/md';
import { RiChatSmile3Line } from "react-icons/ri";
import { MdOutlineHistory } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import Sidebar from '@/components/sidebar';
import { useSelector } from 'react-redux';
//import withAuth from '@/app/hoc/wihAuth';




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


  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "./aboutus" },
    { name: "Privacy Policy", href: "./privacypolicy" },
    { name: "Contact", href: "./contactus" }
  ];
  return (
    <div>
      <Chatheader rightElement={< CompanionNotification />}  backgroundColor="rgba(250, 236, 236, 0.8)" navLinks={navLinks}   />
      <div className='notifymbsecond'>
      <CompanionNotify backgroundColor='transparent' color='black'/>
      </div>
      <div className="chatpage">
        <div>
          <Companionsidebar/>
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


export const CompanionNotification = () => {
  return (
    <>
      <div className="flex gap-2 mr-4">
        <CompanionNotify backgroundColor='black' color='white'/>
        <div className="bellicon">
          <CgProfile color="white" size={20} />
        </div>
      </div>
      
    </>
  );
};

export const CompanionNotify = ({ backgroundColor = "black", color='white' }) => {

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
     <div className="bellicon" onClick={toggleDropdown} style={{ backgroundColor,color }}>
          <FaRegBell  size={20} />
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
              <li>this is companion notification.</li>
              
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
  )
}

export const Companionsidebar = () => {
  const menuItems = [
    { label: 'Chats', route: './chats', icon: RiChatSmile3Line  },
    { label: 'Booking History', route: './bookinghistory', icon: MdOutlineHistory },
    { 
      label: 'Settings', 
      icon: CiSettings, 
      isDropdown: true, 
      dropdownItems: [
     //   { label: 'Profile Settings', route: '/page-one/profile-settings',  },
    //    { label: 'Raise a Concern', route: '/page-one/raise-concern', icon: MdOutlineReportProblem },
        { label: 'Logout', route: '/', icon: MdLogout },
      ] 
    },
  ];

  const user = {
    photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVtYWxlJTIwbW9kZWx8ZW58MHx8MHx8fDA%3D',
    name: 'John Doe',
    email: 'johndoe@example.com',
  };
  return (
    <>
      <Sidebar menuItems={menuItems}  user={user}/>
    </>
  );
};












export default page;
