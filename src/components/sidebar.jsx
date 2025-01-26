'use client';
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Link from 'next/link';


const Sidebar = ({ menuItems , user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMouseEnter = () => {
    if (window.innerWidth > 810) {
      setIsSidebarOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 810) {
      setIsSidebarOpen(false);
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    }
  };

  return (
    <div>
    {/* Sidebar toggle button for screens below 810px */}
    <button className="toggle-button-sidebar" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
      ☰
    </button>

    {/* Sidebar container */}
    <div 
      className={`sidebar ${isSidebarOpen ? 'open' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
 
        {/* User profile section */}
        <div className="menu-item-second user-profile-sidebar">
          <img src={user.photo} alt="User Profile" className="profile-photo-sidebar" />
          {isSidebarOpen && (
            <div className="user-info-sidebar">
              <p className="username-sidebar">{user.name}</p>
              <p className="email-sidebar">{user.email}</p>
            </div>
          )}
        </div>

      {/* Menu items */}
      <ul className="menu-sidebar">
        {menuItems.map((item, index) => (
          <li key={index} className="menu-item-sidebar" onClick={item.isDropdown ? toggleDropdown : undefined}>
            <span className="icon-sidebar">{React.createElement(item.icon)}</span>
            {isSidebarOpen && (
              <>
                {item.route ? (
                  <Link href={item.route}>
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
                {item.isDropdown && <FaChevronDown className="dropdown-arrow-sidebar" />}
              </>
            )}
            {item.isDropdown && isDropdownOpen && isSidebarOpen && (
              <ul className="dropdown below">
                {item.dropdownItems.map((dropdownItem, idx) => (
                  <li key={idx} className="dropdown-item">
                    {dropdownItem.route ? (
                      <Link href={dropdownItem.route}>{dropdownItem.label}</Link>
                    ) : (
                      <span onClick={dropdownItem.handleclick}>{dropdownItem.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default Sidebar;