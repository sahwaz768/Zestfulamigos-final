'use client';
import React, { useState } from 'react';
import { FaRegBell } from 'react-icons/fa6';
import Image from 'next/image'
import Logo from '@/shared/Assets/companylogo.jpeg';

const Notify = ({ backgroundColor = 'black', color = 'white' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      description:
        'Please submit your quarterly figures for Q2 by EOB on August 15.',
      time: 'Just now'
    },
    {
      id: 2,
      description:
        'Paula Smith has requested vacation from Aug 24 – Sep 5, 2020.',
      time: '4 minutes ago'
    },
    {
      id: 3,
      
      description:
        'Invoice 1234678 is blocked for payment and will soon be overdue.',
      time: '32 minutes ago'
    }
  ]);

  const removeNotification = (id) =>
    setNotifications(notifications.filter((notif) => notif.id !== id));

  return (
    <div>
      <div
        className="bellicon"
        onClick={toggleDropdown}
        style={{ backgroundColor, color }}
      >
        <FaRegBell size={20} />
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
            <div className="">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="notification-card   flex items-start  bg-white shadow-sm  relative gap-3 py-3"
                >
                  {/* Avatar */}
                  <Image
                    src={Logo}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover mt-1"
                  />

                  {/* Content */}
                  <div className="">
                    <div className="flex justify-between items-center gap-4">
                      <p className="text-xs text-gray-600 ">
                        {notification.description}
                      </p>
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="text-blue-800 hover:text-red-500 crossbtn"
                      >
                        ✕
                      </button>
                    </div>

                    <small className="text-xs text-red-700 pt-6 ">
                      {notification.time}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notify;
