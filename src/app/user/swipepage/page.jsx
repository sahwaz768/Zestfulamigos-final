'use client';
import React, { useState } from 'react';
import { FaRegBell } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';
import { CiMenuBurger } from 'react-icons/ci';
import Sidebar from '@/components/sidebar';
import Swipepagemodal from '@/components/swipepagemodal';

const page = () => {
  /* logic for nav bar */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const images = [
    'https://img.freepik.com/premium-photo/photography-beautiful-young-happy-fashion-model-woman_1288657-24992.jpg?semt=ais_hybrid',
    'https://s3.ap-south-1.amazonaws.com/modelfactory.in/upload/2023/Feb/18/blog_images/43b6b34c9d64d40ba7fb7be86d6f35fb.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPKXpTj5ZoWA1NikAyOWORfK0vdWw9iTCTCE3Esl_cNdejhEiEjQevx5A_6uLHMLi6MSo&usqp=CAU',
    'https://t4.ftcdn.net/jpg/07/05/40/77/360_F_705407769_qWzohDKyvuu78V65ICzDkXt7xDX3G9RE.jpg'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the previous image
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Function to go to the next image
  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
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
    <div className="swipebox">
    <Swipepagemodal/>
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

      <div>
        <div className="wrapper">
          <div className="bg-card bg-card-left-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISmJ3wr4IfIf6Y8r22sRa072YxjfXJdu1WQ&s"
              alt="Background card"
            />
          </div>
          <div className="bg-card bg-card-right-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISmJ3wr4IfIf6Y8r22sRa072YxjfXJdu1WQ&s"
              alt="Background card"
            />
          </div>

          <div className="bg-card bg-card-left-1">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISmJ3wr4IfIf6Y8r22sRa072YxjfXJdu1WQ&s"
              alt="Background card"
            />
          </div>
          <div className="bg-card bg-card-right-1">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISmJ3wr4IfIf6Y8r22sRa072YxjfXJdu1WQ&s"
              alt="Background card"
            />
          </div>

          <div className="container">
            <h1 className="font-extrabold">Select your amigo</h1>
            <p className="text-sm mt-2 px-8">
              Check out our Companion list Swipe by right or left option.
            </p>

            <div className="card-container">
              <div className="card">
                <img src={images[currentIndex]} alt="Profile picture" />
                <div className="txtimg flex ">
                  <div className="imgtag1">
                    <h1>jerry</h1>
                  </div>
                  <div className="imgtag2">
                    <h1>1200\hr</h1>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="card-title text-center text-xs font-extrabold">
                    Dig deeper
                  </div>
                </div>
              </div>
            </div>

            <div className="navigation">
              <button class="nav-button" onClick={prevSlide}>
                ←
              </button>
              <button class="nav-button" onClick={nextSlide}>
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
