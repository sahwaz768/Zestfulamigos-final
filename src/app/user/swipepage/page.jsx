'use client';
import React, { useState } from 'react';
import { FaRegBell } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';
import Chatheader from '@/components/Masterheader';
import Link from 'next/link';

const Page = () => {
  const slides = [
    {
      id: 1,
      imgSrc:
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVtYWxlJTIwbW9kZWx8ZW58MHx8MHx8fDA%3D',
      name: 'Jerry',
      price: '1200/hr',
      title: 'Dig deeper'
    },
    {
      id: 2,
      imgSrc:
        'https://img.freepik.com/free-photo/person-background-women-corporate-shopaholic-life_1303-2789.jpg',
      name: 'Alice',
      price: '1500/hr',
      title: 'Explore more'
    },
    {
      id: 3,
      imgSrc: 'https://img.freepik.com/free-photo/girl-park_1157-15182.jpg',
      name: 'Mike',
      price: '1100/hr',
      title: 'Discover yourself'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

 

  return (
    <>
      <div className="swipebox">
        <Chatheader rightElement={<Notification />} />
        <div className="swipe-container-first">
          <h1 className="font-extrabold text-center">Select your amigo</h1>
          <p className="text-sm mt-2 px-8 text-center">
            Check out our Companion list. Swipe left or right to explore.
          </p>
        </div>

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

          <div className="container">
            <div className="card-container">
              <div className="card">
                <img
                  src={slides[currentIndex].imgSrc}
                  alt={slides[currentIndex].title}
                  className="slide-image"
                />
                <div className="card-footer">
                  <Link href="./companiondetail">
                    <div className="card-title text-center text-xs font-extrabold">
                      {slides[currentIndex].title}
                    </div>
                  </Link>
                </div>
              </div>

              <div className="navigation">
                <button className="nav-button" onClick={handlePrev}>
                  ←
                </button>
                <button className="nav-button" onClick={handleNext}>
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Notification = () => {

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
      <div className="flex gap-2 mr-4">
        <div className="bellicon" onClick={toggleDropdown}>
          <FaRegBell color="white" size={20} />
        </div>
        <div className="bellicon">
          <CgProfile color="white" size={20} />
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

export default Page;
