'use client'
import React, { useState } from "react";
import { FaRegBell } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

const Header = () => {
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
  return (
    <div>
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
                <div className="bellicon"  onClick={toggleDropdown}>
            <FaRegBell  color="white" size={20}/>
            </div>
            <div className="bellicon">
            <CgProfile  color="white" size={20}/>
            </div>
            </div>

           
          </header>
          </div>
          {isOpen && (
        <div className="dropdown-menu">
        hey this is an notification panal
        </div>
      )}

<div></div>
    </div>
  )
}

export default Header