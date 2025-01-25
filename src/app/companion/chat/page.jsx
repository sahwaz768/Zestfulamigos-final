'use client';
import Notify from '@/components/Notify';
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
      <Notify backgroundColor='transparent' color='black'/>
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
        <Notify backgroundColor='black' color='white'/>
        <div className="bellicon">
          <CgProfile color="white" size={20} />
        </div>
      </div>
      
    </>
  );
};



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
