'use client';
import React, { useState } from 'react';
import { FaRegBell } from 'react-icons/fa6';


const Notify = ({ backgroundColor = 'black', color = 'white' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const [notifications, setNotifications] = useState([
      {
        id: 1,
        avatar:
          'https://e7.pngegg.com/pngimages/636/819/png-clipart-computer-icons-privacy-policy-admin-icon-copyright-rim.png',
        title: 'Your financial report is overdue',
        description:
          'Please submit your quarterly figures for Q2 by EOB on August 15.',
        time: 'Just now',
        actions: []
      },
      {
        id: 2,
        avatar:
          'https://e7.pngegg.com/pngimages/636/819/png-clipart-computer-icons-privacy-policy-admin-icon-copyright-rim.png',
        title: 'Leave request requires your approval',
        description:
          'Paula Smith has requested vacation from Aug 24 – Sep 5, 2020.',
        time: '4 minutes ago',
        actions: ['Approve', 'Reject', 'Forward']
      },
      {
        id: 3,
        avatar:
          'https://e7.pngegg.com/pngimages/636/819/png-clipart-computer-icons-privacy-policy-admin-icon-copyright-rim.png',
        title: 'Blocked invoice overdue soon',
        description:
          'Invoice 1234678 is blocked for payment and will soon be overdue.',
        time: '32 minutes ago',
        actions: []
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
            <div className="max-w-md ">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="notification-card  p-3 flex items-start gap-3 bg-white shadow-sm rounded-md relative"
                >
                  {/* Avatar */}
                  <img
                    src={notification.avatar}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-gray-800">
                        {notification.title}
                      </h4>
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="text-blue-800 hover:text-red-500"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      {notification.description}
                    </p>
                    <small className="text-xs text-red-700">
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
  )
}

export default Notify
