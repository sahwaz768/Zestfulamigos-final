'use client';
import React, { useState } from 'react';
import { IoCallOutline } from 'react-icons/io5';
import { VscSend } from 'react-icons/vsc';
import { CiLocationOn } from 'react-icons/ci';
import { IoIosArrowBack } from 'react-icons/io';

const chatwindow = () => {
  const [messages, setMessages] = useState([
    { text: 'Hi there!', sender: 'receiver' },
    { text: 'Hello!', sender: 'sender' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: 'sender' }]);
      setInputValue('');
    }
  };

  const handlePhoneCall = () => {
    const phoneNumber = '+1234567890';
    window.location.href = `tel:${phoneNumber}`;
  };

  const backbtn = () => {
    document.getElementById('chatlist').style.display = 'block';
    document.getElementById('chatwindow').style.display = 'none';
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chatheader">
          <div className="user-details">
            <div className="flex">
              <div className="mt-2 mx-2 chatbackbtn" onClick={backbtn}>
                <IoIosArrowBack color="black" size={25} />
              </div>

              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISmJ3wr4IfIf6Y8r22sRa072YxjfXJdu1WQ&s"
                alt=""
              />
              <div className="ml-5 my-1">
                <h1 className=" font-bold">Olivia Rhye</h1>
                <p className="text-xs text-pink-700 ml-1 font-light">Online</p>
              </div>
            </div>
            <div className="callbtn" onClick={handlePhoneCall}>
              <IoCallOutline size={20} color="white" />
              <h1 className="text-lg">call</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
            <br />
            <p className="msgtime">12.00pm</p>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <div className="chat-input-container">
          <input
            type="text"
            value={inputValue}
            placeholder="Type a message..."
            onChange={(e) => setInputValue(e.target.value)}
            className="chat-input-text"
          />
          <div className="send-button flex">
            <div className="flex justify-center items-center mx-4">
              <CiLocationOn color="white" size={20} />
            </div>
            <div className="msgsendbtn" onClick={sendMessage}>
              <h1>Send</h1>
              <div>
                <VscSend color="black" size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default chatwindow;
