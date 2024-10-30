"use client";
import React, { useState } from "react";
import { FaRegBell } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

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
    "https://img.freepik.com/premium-photo/photography-beautiful-young-happy-fashion-model-woman_1288657-24992.jpg?semt=ais_hybrid",
    "https://s3.ap-south-1.amazonaws.com/modelfactory.in/upload/2023/Feb/18/blog_images/43b6b34c9d64d40ba7fb7be86d6f35fb.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPKXpTj5ZoWA1NikAyOWORfK0vdWw9iTCTCE3Esl_cNdejhEiEjQevx5A_6uLHMLi6MSo&usqp=CAU",
    "https://t4.ftcdn.net/jpg/07/05/40/77/360_F_705407769_qWzohDKyvuu78V65ICzDkXt7xDX3G9RE.jpg",
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

  return (
    <div className="swipebox">
      <div className="swipeheader">
        <header className="header ">
          <div className="menu-toggle" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <div className="logo ">zestful amigos</div>

          <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
            <ul className="nav-list">
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
      {isOpen && (
        <div className="dropdown-menu">hey this is an notification panal</div>
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
