'use client';
import Image from 'next/image';
import Profile from '@/app/homepageimg.jpg';
import { FaStar } from 'react-icons/fa6';
import { IoIosTimer } from 'react-icons/io';
import { RiChatSmile2Line } from 'react-icons/ri';
import { MdHistory } from 'react-icons/md';
import { CiLogout } from 'react-icons/ci';
import React, { useState } from 'react';
import { IoHomeOutline } from "react-icons/io5";

const page = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // validation for text area

  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation check
    if (text.trim() === '') {
      setError('please specify the reason');
      return;
    }

    // If validation passes
    setError('');
    console.log('Submitted text:', text); // Log the textarea content to the console
    alert('Form submitted successfully!');
    setText(''); // Clear the textarea after submission
  };

  return (
    <>
      <div className="companion-dashboard">
        <div className="companion-dash-topbox">
          <div className="text-2xl pl-3 pt-3 wlcome">Welcome back Alisha!</div>
          <div className="companion-detail">
            <div className="flex justify-center items-center gap-2 mt-2 mr-3">
              <Image src={Profile} alt="profile" />
              <div>
                <h1>Olivia Rhye</h1>
                <div className="flex">
                  <FaStar color="white" />
                  <FaStar color="white" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div>
            <Chatsideicon2 />
          </div>
          <div>
            <h1 className="text-lg font-bold mt-4 ml-4">Recent bookings</h1>
            <div className="companion-recent-booking-box">
              <div className="flex  font-bold text-gray-900">
                <h1>Alex parker:</h1> <span>2 Hour Visit</span>
              </div>
              <div className="flex text-xs font-bold text-gray-600">
                <h1>September 5th 2025</h1>
              </div>
              <div className="flex gap-9 mt-2 text-sm font-bold">
                <h1>
                  Gender: <span>Male</span>
                </h1>
                <h1>
                  age: <span>24</span>
                </h1>
              </div>
              <div className="flex gap-1 text-sm font-bold items-center mt-2">
                <IoIosTimer color="red" /> <h1>12.00-2.00PM</h1>
              </div>
              <div className="flex text-sm font-bold mt-2">
                <h1>Description:</h1>
                <span>
                  hey i want to take into my place xcbjchvsdcfhdksjfchnksd
                  bhdakjcfbhchaksechksacfhsezkhcfhsekugcksaekcfseacf
                  ajdkadhkbchkbwahdka
                </span>
              </div>
              <div className="flex text-sm font-bold mt-2">
                <h1>location of meetup:</h1> <span>Mumbai</span>
              </div>
              <div>
                <button onClick={openModal}>cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="companion-modal-overlay" >
          <div
            className="companion-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeModal} className="close">
              &times;
            </button>
            <h1 className="text-center font-bold">Please specify the reason</h1>

            <form onSubmit={handleSubmit}>
              <div >
                <textarea
                  id="textarea"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Reason...."
                  className="companion-textarea"
                ></textarea>
              </div>
              {error && <div className="text-xs">{error}</div>}
              <button type="submit" className="companion-cancel-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export const Chatsideicon2 = () => {
  return (
    <>
      <div className="chat-side-icon">
      <IoHomeOutline color='black' size={25}/>
        <RiChatSmile2Line color="black" size={25} />
        <MdHistory color="black" size={25} />
        <CiLogout color="black" size={25} />
       
      </div>
    </>
  );
};

export default page;
