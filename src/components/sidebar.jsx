'use client'
import { useState } from "react";
import { RiChatSmile2Line } from "react-icons/ri";
import { MdHistory } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";

const sidebar = () => {


  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
 <div className="sidebar-container">
      {/* Sidebar Toggle Button */}
      <button
        className={`sidebar-toggle ${isOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
      >
        <svg
          className={`toggle-icon ${isOpen ? 'rotate' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar Content */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <div className="sidebar-title ">
          <h2 className=''>Olivia Rhye</h2>
          <p className='text-xs text-gray-500'>olivia123@gmail.com</p>

          </div>
          <nav>
            <ul className="nav-list-sidebar">
              <li>
                <a href="#" className="nav-link-sidebar">
                <RiChatSmile2Line  color='black' size={20}/> Chat
                </a>
              </li>
              <li>
                <a href="#" className="nav-link-sidebar">
                <MdHistory  color='black' size={20}/>Booking history
                </a>
              </li>
              <li>
                <a href="#" className="nav-link-sidebar">
                <CgProfile  color='black' size={20}/>Profile settings
                </a>
              </li>
              <li>
                <a href="#" className="nav-link-sidebar">
                <CiLogout color="black" size={20} />Logout
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar} />}
    </div>

    </>
  )
}

export default sidebar

