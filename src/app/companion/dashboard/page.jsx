'use client';
import Image from 'next/image';
import Profile from '@/app/homepageimg.jpg';
import { FaStar } from 'react-icons/fa6';
import { IoIosTimer } from 'react-icons/io';
import { RiChatSmile2Line } from 'react-icons/ri';
import { MdHistory } from 'react-icons/md';
import { CiLogout } from 'react-icons/ci';
import React, { useState } from 'react';
import { IoHomeOutline } from "react-icons/io5";
import Link from 'next/link';
import { FaRegBell } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';
import Sidebar2 from '@/components/sidebar2';


const page = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // validation for text area

  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation check
    if (text.trim() === '') {
      setError('please specify the reason');
      return;
    }

    // If validation passes
    setError('');
    console.log('Submitted text:', text); // Log the textarea content to the console
    alert('Form submitted successfully!');
    setText(''); // Clear the textarea after submission
  };

  return (
    <>
      <div className="companion-dashboard">
        <div className="">
          <Chatheadersecond/>
          
        </div>
        <div className="flex">
          <div>
            
          </div>
          <div>
            <h1 className="text-lg font-bold mt-4 ml-4">Recent bookings</h1>
            <div className="companion-recent-booking-box">
              <div className="flex  font-bold text-gray-900">
                <h1>Alex parker:</h1> <span>2 Hour Visit</span>
              </div>
              <div className="flex text-xs font-bold text-gray-600">
                <h1>September 5th 2025</h1>
              </div>
              <div className="flex gap-9 mt-2 text-sm font-bold">
                <h1>
                  Gender: <span>Male</span>
                </h1>
                <h1>
                  age: <span>24</span>
                </h1>
              </div>
              <div className="flex gap-1 text-sm font-bold items-center mt-2">
                <IoIosTimer color="red" /> <h1>12.00-2.00PM</h1>
              </div>
              <div className="flex text-sm font-bold mt-2">
                <h1>Description:</h1>
                <span>
                  hey i want to take into my place xcbjchvsdcfhdksjfchnksd
                  bhdakjcfbhchaksechksacfhsezkhcfhsekugcksaekcfseacf
                  ajdkadhkbchkbwahdka
                </span>
              </div>
              <div className="flex text-sm font-bold mt-2">
                <h1>location of meetup:</h1> <span>Mumbai</span>
              </div>
              <div>
                <button onClick={openModal}>cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="companion-modal-overlay" >
          <div
            className="companion-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeModal} className="close">
              &times;
            </button>
            <h1 className="text-center font-bold">Please specify the reason</h1>

            <form onSubmit={handleSubmit}>
              <div >
                <textarea
                  id="textarea"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Reason...."
                  className="companion-textarea"
                ></textarea>
              </div>
              {error && <div className="text-xs">{error}</div>}
              <button type="submit" className="companion-cancel-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export const Chatsideicon2 = () => {
  return (
    <>
      <div className="chat-side-icon">
     <Link href={'./dashboard'}> <IoHomeOutline color='black' size={25}/> </Link>
     <Link href={'./chat'}> <RiChatSmile2Line color="black" size={25} /> </Link>
       <Link href={'./bookinghistory'}> <MdHistory color="black" size={25} /> </Link>
       <Link href={'./login'}> <CiLogout color="black" size={25} /> </Link>
       
      </div>
    </>
  );
};


export const Chatheadersecond = () => {
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
                <Link href={'/'}>
                  {' '}
                  <p>Home</p>{' '}
                </Link>
              </li>
              <li>
                <Link href={'./aboutus'}>
                  {' '}
                  <p>About</p>
                </Link>
              </li>
              <li>
                <Link href={'./privacypolicy'}>
                  {' '}
                  <p>Privacy policy</p>{' '}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex gap-2 mr-4">
            <div className="bellicon" onClick={toggleDropdown}>
              <FaRegBell color="white" size={20} />
            </div>
            <Link href={'./profile'}>
              {' '}
              <div className="bellicon2">
                <CgProfile color="white" size={20} />
              </div>
            </Link>
          </div>
        </header>
      </div>
      <div className="noti-mb-view w-full px-4">
        <div className="threelinembview">
          <Sidebar2 />
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

export default page;
