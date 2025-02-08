'use client';
import React, { useState } from 'react';
import Chatheader from '@/components/Masterheader';
import Link from 'next/link';

import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import { BASEURL } from '@/Constants/services.constants';
import Notify from '@/components/Notify';

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


export default Page;
