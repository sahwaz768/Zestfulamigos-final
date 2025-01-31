'use client';
import Image from 'next/image';
import Profile from '@/app/homepageimg.jpg';
import Companionchatwindow from '@/components/companionchatwindow';
import Chatheader from '@/components/Masterheader';
import { CgProfile } from 'react-icons/cg';
import React, { useState } from 'react';
import Sidebar from '@/components/sidebar';
import { useSelector } from 'react-redux';
//import withAuth from '@/app/hoc/wihAuth';
import Notify from '@/components/Notify';
import { navLinks } from 'src/utils/constants.js';
import { companionsidebarlink } from 'src/utils/constants.js';
import { companionsidebardetail } from 'src/utils/constants.js';

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
  
  const links = navLinks; 
  const companionmenulink = companionsidebarlink; 
  const companiondetail = companionsidebardetail; 
  return (
    <div>
      <Chatheader rightElement={< CompanionNotification />}  backgroundColor="rgba(250, 236, 236, 0.8)" navLinks={links}   />
      <div className='notifymbsecond'>
      <Notify backgroundColor='transparent' color='black'/>
      </div>
      <div className="chatpage">
        <div>
        <Sidebar menuItems={companionmenulink}  user={companiondetail}/>
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

export default page;
