'use client';
import React, { useState } from 'react';
import { FaRegBell } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';
import Chatheader from '@/components/Masterheader';
import Link from 'next/link';
import { MdLogout, MdOutlineReportProblem } from 'react-icons/md';
import { RiChatSmile3Line } from 'react-icons/ri';
import { MdOutlineHistory } from 'react-icons/md';
import { CiSettings } from 'react-icons/ci';
import Sidebar from '@/components/sidebar';
import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import { BASEURL } from '@/Constants/services.constants';

const Page = () => {
  const companions = useSelector((state) => state.companionFind.data?.data);
  if (!companions) {
    redirect('/user/genderchoose');
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? companions.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === companions.length - 1 ? 0 : prevIndex + 1
    );
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: './aboutus' },
    { name: 'Privacy Policy', href: './privacypolicy' },
    { name: 'Contact', href: './contactus' }
  ];
  return (
    <>
      <div className="swipebox">
        <Chatheader
          rightElement={<Notification />}
          backgroundColor="rgba(250, 236, 236, 0.8)"
          navLinks={navLinks}
        />
        <Threeline />
        <div className="swipe-container-first">
          <h1 className="font-extrabold text-center">Select your amigo</h1>
          <p className="text-sm mt-2 px-8 text-center">
            Check out our Companion list. Swipe left or right to explore.
          </p>
        </div>

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

          <div className="container">
            <div className="card-container">
              <div className="card">
                <img
                  src={BASEURL + `/` + 'UserPhotos/companion1.jpg'}
                  alt={'profile image'}
                  className="slide-image"
                />
                <div>
                  <div>{companions[currentIndex].firstname}</div>
                  <div className="card-footer">
                    <Link
                      href={`./companiondetail/?companionId=${companions[currentIndex].userid}`}
                    >
                      <div className="card-title text-center text-xs font-extrabold">
                        {'Dig deeper'}
                      </div>
                    </Link>
                  <div>
                    <span>Booking Rate</span>
                    {companions[currentIndex].bookingrate} /{' '}
                    {companions[currentIndex].bookingrateunit}
                  </div>
                  <div>
                    {companions[currentIndex].distance.toFixed(2)} Km away
                  </div>
                  </div>
                </div>
              </div>

              <div className="navigation">
                <button className="nav-button" onClick={handlePrev}>
                  ←
                </button>
                <button className="nav-button" onClick={handleNext}>
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Notification = () => {
  return (
    <>
      <div className="flex gap-2 mr-4">
        <Notify backgroundColor="black" color="white" />
        <div className="bellicon">
          <CgProfile color="white" size={20} />
        </div>
      </div>
    </>
  );
};

export const Threeline = () => {
  return (
    <>
      <div className="threeline">
        <div className="flex gap-2 mr-4 ">
          <div className="threelinembview mt-3 ml-3">
            <Mastersidebar />
          </div>
          <div className="notifymb">
            <Notify backgroundColor="transparent" color="black" />
          </div>
        </div>
      </div>
    </>
  );
};

export const Mastersidebar = () => {
  const handleLogout = async () => {
    const { logoutUserService } = await import("../../../services/auth/logout.service");
    const { removeUserData } = await import('../../../utils/removeUserData')
    await logoutUserService()
    await removeUserData()
    redirect('/')
  }
  const menuItems = [
    { label: 'Chats', route: './chat', icon: RiChatSmile3Line },
    {
      label: 'Booking History',
      route: './bookinghistory',
      icon: MdOutlineHistory
    },
    {
      label: 'Settings',
      icon: CiSettings,
      isDropdown: true,
      dropdownItems: [
        { label: 'Profile Settings', route: './profile' },
        {
          label: 'Raise a Concern',
          route: '/page-one/raise-concern',
          icon: MdOutlineReportProblem
        },
        { label: 'Logout', icon: MdLogout, handleclick :handleLogout }
      ]
    }
  ];

  const user = {
    photo:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVtYWxlJTIwbW9kZWx8ZW58MHx8MHx8fDA%3D',
    name: 'John Doe',
    email: 'johndoe@example.com'
  };
  return (
    <>
      <Sidebar menuItems={menuItems} user={user} />
    </>
  );
};

export const Notify = ({ backgroundColor = 'black', color = 'white' }) => {
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
    <>
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
    </>
  );
};

export default Page;
