'use client';
import React, { useState } from 'react';
import { FaRegBell } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';
import { Chatheader } from '../chat/page';
import Sidebar from '@/components/sidebar';
import Swipepagemodal from '@/components/swipepagemodal';
import Link from 'next/link';

const page = () => {
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

  // slidder

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
      <Chatheader />
      <Chatheader />

      <div>
        <div className="swipe-container-first">
          <h1 className="font-extrabold text-center">Select your amigo</h1>
          <p className="text-sm mt-2 px-8 text-center">
            Check out our Companion list Swipe by right or left option.
          </p>
        <div className="swipe-container-first">
          <h1 className="font-extrabold text-center">Select your amigo</h1>
          <p className="text-sm mt-2 px-8 text-center">
            Check out our Companion list Swipe by right or left option.
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
            <div className="swipe-container">
              <h1 className="font-extrabold">Select Your Amigo</h1>
              <p className="text-sm mt-2 px-8">
                Check out our Companion list Swipe by right or left option.
              </p>
            </div>
            <div className="card-container">
              <div className="card">
                <img
                  src={slides[currentIndex].imgSrc}
                  alt={slides[currentIndex].title}
                  className="slide-image"
                />

                <div className="card-footer">
                  <Link href={'./companiondetail'}>
                    {' '}
                    <div className="card-title text-center text-xs font-extrabold">
                      Dig Deeper
                    </div>
                  </Link>
                </div>
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
  );
};

export default page;
