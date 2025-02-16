'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaRegBell } from 'react-icons/fa6';
import Image from 'next/image';
import Logo from '@/shared/Assets/companylogo.jpeg';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const Notify = ({ backgroundColor = 'black', color = 'white' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const notificationRedux = useSelector(
    (state) => state.userNotifications.data
  );

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
                {notificationRedux &&
                  notificationRedux.map((notification) => (
                    <div
                      key={notification.id}
                      className="notification-card flex items-start bg-white shadow-sm relative gap-3 py-3"
                    >
                      <Image
                        src={Logo}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover mt-1"
                      />
                      <div>
                        <div className="flex justify-between items-center gap-4">
                          <p className="text-xs text-gray-600">
                            {notification.content}
                          </p>
                          {notification.buttoncontent && (
                            <div>
                              <button>
                                <Link href={notification.route}>
                                  {notification.buttoncontent}
                                </Link>
                              </button>
                            </div>
                          )}
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
    </>
  );
};

export default Notify;
