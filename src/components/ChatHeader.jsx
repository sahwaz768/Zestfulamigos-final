import Link from "next/link";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaRegBell } from "react-icons/fa";

const Chatheader = () => {
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
              <Link href={'/'}>  <p >Home</p> </Link>  
                </li>
                <li>
                <Link href={'./aboutus'}> <p >About</p></Link> 
                </li>
                <li>
               <Link href={'./privacypolicy'}>  <p>Privacy policy</p> </Link> 
                </li>
                
              </ul>
            </nav>
            <div className="flex gap-2 mr-4">
              <div className="bellicon" onClick={toggleDropdown}>
                <FaRegBell color="white" size={20} />
              </div>
           <Link href={'./profile'}>  <div className="bellicon2">
                <CgProfile color="white" size={20} />
              </div>
              </Link> 
            </div>
          </header>
        </div>
        <div className="noti-mb-view w-full px-4">
          <div className="threelinembview">
            {/* <Sidebar /> */}
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

export default Chatheader;