'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaRegBell } from 'react-icons/fa6';
import Image from 'next/image'
import Logo from '@/shared/Assets/companylogo.jpeg';
import { useSelector } from 'react-redux';

const Notify = ({ backgroundColor = 'black', color = 'white' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const notificationRedux = useSelector((state) => state.userNotifications.data);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      description: 'Your booking with Wamika has been confirmed for 12:25 PM on January 26th. Click here to start a conversation with her.',
      time: 'Just now',
      link: '/user/chat'
    },
    {
      id: 2,
      description: 'Just a reminder – your booking with Alisha is coming up soon! Don’t be late! ⏰',
      time: '4 minutes ago',
      
    },
    {
      id: 3,
      description: 'Payment successful! You’re all set for a fantastic time with Alisha. 💸✨',
      time: '32 minutes ago'
    },
    {
      id: 4,
      description: 'Oops! Your payment didn’t go through. Please try again to confirm your booking. 🚫 💳',
      time: '40 minutes ago'
    },
    {
      id: 5,
      description: 'Your booking is pending . We’ll update you soon! 🕒',
      time: '45 minutes ago'
    },
    {
      id: 6,
      description: 'Your booking with Wamika has been cancelled. Hope to see you back soon! 👋',
      time: '50 minutes ago'
    },
    {
      id: 7,
      description: 'We’re sorry, your booking with Sara has been cancelled. Check your inbox for details. ❌',
      time: '55 minutes ago'
    }
    ,
    {
      id: 8,
      description: 'Sara is unavailable. Choose another companion to keep your plans on track! 🔄',
      time: '59 minutes ago'
    }
    ,
    {
      id: 9,
      description: 'Monika would be perfect for your next booking. Check out their profile! 🌟',
      time: '60 minutes ago',
       link: '/user/swipepage'
    }
  ]);

  const removeNotification = (id) =>
    setNotifications(notifications.filter((notif) => notif.id !== id));

  return (
    <>
      <div ref={dropdownRef}>
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
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="notification-card flex items-start bg-white shadow-sm relative gap-3 py-3"
                >
                  {/* Avatar */}
                  <Image
                    src={Logo}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover mt-1"
                  />

                  {/* Content */}
                  <div>
                    <div className="flex justify-between items-center gap-4">
                      {notification.link ? (
                        <Link href={notification.link} className="text-xs text-gray-600 hover:text-blue-600">
                          {notification.description}
                        </Link>
                      ) : (
                        <p className="text-xs text-gray-600">{notification.description}</p>
                      )}
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="text-blue-800 hover:text-red-500 crossbtn"
                      >
                        ✕
                      </button>
                    </div>

                    <small className="text-xs text-red-700 pt-6 ">{notification.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Notify;
