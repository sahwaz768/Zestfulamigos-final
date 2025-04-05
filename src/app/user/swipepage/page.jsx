'use client';
import React, { useEffect, useState } from 'react';
import Chatheader from '@/components/Masterheader';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import { BASEURL } from '@/Constants/services.constants';
import { capitalizedWord } from '@/utils/common.utils';
import Loadingbar from '@/components/Loadingbar';
import Threeline from '@/components/ThreeLine';

const Page = () => {
  const [companiondata, setcompaniondata] = useState(null);
  const companions = useSelector((state) => state.companionFind.data?.data);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!companions) {
        redirect('/user/genderchoose');
      }
    }, 10000);
    if (companions && !companiondata) {
      setcompaniondata(companions);
      clearTimeout(timer);
    }
  }, [companions]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? companiondata.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === companiondata.length - 1 ? 0 : prevIndex + 1
    );
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: './aboutus' },
    { name: 'Privacy Policy', href: './privacypolicy' },
    { name: 'Contact', href: './contactus' }
  ];
  if (!companiondata) {
    return <div><Loadingbar/></div>;
  }
  return (
    <>
    <Threeline />
      <div className="swipebox">
        <Chatheader
          backgroundColor="rgba(250, 236, 236, 0.8)"
          navLinks={navLinks}
        />
        <div className="swipe-container-first">
          <h1 className="font-extrabold text-center">Select your amigo</h1>
          <p className="text-sm mt-2 px-8 text-center">
            Check out our Companion list. Swipe left or right to explore.
          </p>
        </div>
        {companiondata && companiondata.length ? (
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
                    src={companions[currentIndex].images[0]}
                    alt={'profile image'}
                    className="slide-image"
                  />

                  <div className="card-footer">
                    <div>
                      <div className="text-sm font-extrabold text-center">
                        {companions[currentIndex].firstname}
                      </div>
                      <div className="flex justify-center">
                        <div className="text-sm">
                          {/*companions[currentIndex].bookingrate*/} {' '}
                          {/*capitalizedWord(companions[currentIndex].bookingrateunit)*/}
                        </div>
                        <div className="text-sm">
                          {companions[currentIndex].distance.toFixed(2)} Km
                        </div>
                      </div>
                      <Link
                        href={`./companiondetail/?companionId=${companions[currentIndex].userId}`}
                      >
                        <div className="card-title text-center text-xs font-extrabold mt-4">
                          {'Dig deeper'}
                        </div>
                      </Link>
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
         ) : (
          <div className='text-center  font-extrabold '>No Companions find in your Area right now..</div>
        )}
      </div>
    </>
  );
};




export default Page;
