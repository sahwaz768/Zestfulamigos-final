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
       <header className="header-x ">
            <div className="menu-toggle-x" onClick={toggleMenu}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
            <div className="logo ">zestful amigos</div>

            <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
              <ul className=" text-black nav-list-x">
                <li>
                  <p>Home</p>
                </li>
                <li>
                  <p >About</p>
                </li>
                <li>
                  <p >Privacy policy</p>
                </li>
                
              </ul>
            </nav>
            

           
          </header>
          </div>
         

<div></div>
    </div>
  )
}

export default Header