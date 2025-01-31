'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Profile from 'src/app/homepageimg.jpg';
import Chatwindow from '@/components/chatwindow';
//import withAuth from '@/app/hoc/wihAuth';
import Chatheader from '@/components/Masterheader';
import { Notification } from '../swipepage/page';
import { GoLocation } from 'react-icons/go';
import { AiOutlineSafety } from 'react-icons/ai';
import { CiLocationOff } from 'react-icons/ci';
import { BiLocationPlus } from 'react-icons/bi';
import { IoIosTimer } from 'react-icons/io';
import { Mastersidebar } from '../swipepage/page';
import Notify from '@/components/Notify';
import { navLinks } from 'src/utils/constants.js';


const Page = React.memo((props) => {
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
  return (
    <>
      <Chatheader
        rightElement={<Notification />}
        backgroundColor="rgba(250, 236, 236, 0.8)"
        navLinks={links}
      />
      <div className='notifymbsecond'>
      <Notify backgroundColor='transparent' color='black'/>
      </div>

      <div className="chatpage">
        <div>
        <Mastersidebar/>
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
            <Chatwindow />
          </div>
        </div>
      </div>
    </>
  );
});

export const Guidmodel = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      {isModalOpen && (
        <div className="Guild-modal-overlay">
          <div
            className="Guild-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-bold text-2xl text-center">Guildelines</h2>
            <div className="flex items-center gap-2 text-xl mt-3">
              <h1>Safety Guildelines for Visits </h1>
              <AiOutlineSafety color="pink" />
            </div>
            <h1 className="text-sm my-2">
              To ensure your safety and maintain the highest standards of
              service, please adhere to the following instructions when meeting
              clients:
            </h1>
            <div className="flex items-center gap-2 text-xl mt-3">
              <h1>Approved Location</h1>
              <GoLocation color="pink" />
            </div>
            <div className="ml-2 text-sm mt-2 gap-2">
              <li>
                Meet only in public, secure venues such as well-known cafes,
                restaurants, hotels, or coworking spaces.
              </li>
              <li>
                Commercial zones and high-traffic areas are preferred, ensuring
                proper lighting and accessibility.{' '}
              </li>
              <li>
                Corporate and private events that have undergone security
                verification are permissible, provided the venue meets safety
                standards.
              </li>
              <li>
                {' '}
                If unsure about a location, consult with your supervisor before
                confirming the visit.
              </li>
            </div>
            <div className="flex items-center gap-2 text-xl mt-3">
              <h1>Prohibited Location</h1>
              <CiLocationOff color="pink" />
            </div>
            <div className="ml-2 text-sm mt-2 gap-2">
              <li>
                Remote or isolated areas are strictly off-limits. This includes
                any location with poor visibility, security, or lighting.
              </li>
              <li>
                Avoid any private residences unless explicitly approved and
                background-checked by our team.
              </li>
              <li>
                {' '}
                High-risk neighborhoods identified for crime or unsafe
                conditions should never be considered for client meetings.
              </li>
              <li>
                Any abandoned or under-construction sites are strictly
                prohibited.
              </li>
            </div>
            <div className="flex items-center gap-2 text-xl mt-3">
              <h1>Additional Safety Measure</h1>
              <BiLocationPlus color="pink" />
            </div>
            <div className="ml-2 text-sm mt-2">
              <li>
                Always share your location in real-time with your supervisor
                during visits.{' '}
              </li>
              <li>
                Carry a mobile phone with emergency contacts readily accessible.
              </li>
              <li>
                If you feel unsafe or uncomfortable at any time, immediately
                exit the situation and report it to management.
              </li>
            </div>
            <div className="flex items-center gap-2 text-xl mt-3">
              <h1>Suggested Timings</h1>
              <IoIosTimer color="pink" />
            </div>
            <div className="ml-2 text-sm mt-2">
              <li>
                Daytime Visits: Preferably between 10:00 AM and 7:00 PM, when
                there is ample daylight and higher public activity.
              </li>
              <li>
                Evening Visits: If necessary, schedule between 7:00 PM and 10:00
                PM only in well-secured, high-traffic areas.
              </li>
              <li>
                No Late-Night Visits: Avoid scheduling any visits after 10:00 PM
                for safety reasons, unless it's a secure, verified venue (e.g.,
                corporate events, hotels).
              </li>
            </div>
            <button onClick={closeModal}>Continue</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
