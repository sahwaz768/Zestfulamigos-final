'use client';
import React, { useEffect, useState } from 'react';
import { IoCallOutline } from 'react-icons/io5';
import { VscSend } from 'react-icons/vsc';
import { CiLocationOn } from 'react-icons/ci';
import { IoIosArrowBack } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BASEURL } from '@/Constants/services.constants';

const chatwindow = ({ selected }) => {
  const [messages, setMessages] = useState([
    { text: 'Hi there!', sender: 'receiver', time: '12:00 PM' },
    { text: 'Hello!', sender: 'sender', time: '12:01 PM' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const filteredWords = ['badword1', 'badword2'];

  // useEffect(() => {
  //   const initializeSocket = async () => {
  //     const { setCookie, parseCookies } = await import('nookies');
  //     const { deletecookie } = await import('../utils/removeUserData');
  //     const cookie = parseCookies();
  //     // const { getRefreshToken } = await import(
  //     //   'src/services/login/login.services'
  //     // );
  //     const { ACCESS_TOKEN_LOC } = await import(
  //       '../Constants/common.constants'
  //     );
  //     const sendData = {
  //       roomid: selected.id,
  //       username
  //     };

  //     const verifyFriendOnline = (data) => {
  //       const selectedUser = data.users?.find(
  //         (l) => l.username === selected?.user?.username
  //       );
  //     };

  //     const socket = socketinit.socket();
  //     socket.on('joinedUser', (data) => {
  //       verifyFriendOnline(data);
  //       setMessageData(() => data);
  //     });

  //     socket.on('message', (data) => {
  //       verifyFriendOnline(data);
  //       setMessageData(() => data);
  //     });

  //     socket.on('leaveroom', (data) => {
  //       verifyFriendOnline(data);
  //       setMessageData(() => data);
  //     });

  //     socket.on('tokenexpired', () => {
  //       socketinit.removetoken();
  //       // getRefreshToken().then((token) => {
  //       //   socket.auth = { token: 'Bearer ' + token };
  //       //   socket.disconnect().connect();
  //       //   socketinit.addtoken((token) || '');
  //       //   const lastEmit = cookie['lastEmit'];
  //       //   if (lastEmit) {
  //       //     const emitted = JSON.parse(lastEmit || '{}');
  //       //     Object.keys(emitted).forEach((l) => {
  //       //       setTimeout(() => socket.emit(l, emitted[l]), 500);
  //       //     });
  //       //     deletecookie('lastEmit');
  //       //   }
  //       // });
  //     });

  //     socket.on('invalidUser', () => {
  //       const token = get(ACCESS_TOKEN_LOC);
  //       if (token) {
  //         socketinit.addtoken(token || '');
  //         const lastEmit = JSON.parse(get('lastEmit') || '{}');
  //         if (lastEmit && Object.keys(lastEmit).length) {
  //           Object.keys(lastEmit).forEach((l) => {
  //             socket.emit(l, lastEmit[l]);
  //             deletecookie('lastEmit');
  //           });
  //         }
  //       }
  //     });

  //     setCookie(
  //       null,
  //       'lastEmit',
  //       JSON.stringify({
  //         joinchatroom: sendData
  //       }),
  //       { path: '/' }
  //     );
  //     socket.emit('joinchatroom', sendData);
  //   };
  //   if (selected) {
  //     initializeSocket();
  //   }
  //   return () => {
  //     const deinitializeSocket = async () => {
  //       const { setCookie } = await import('nookies');
  //       const socket = socketinit.socket();
  //       socket.emit('leavechatroom', {
  //         roomid: selected.id,
  //         username
  //       });
  //       setCookie(
  //         null,
  //         'lastEmit',
  //         JSON.stringify({
  //           leavechatroom: { roomid: selected.id, username }
  //         }),
  //         { path: '/' }
  //       );
  //     };
  //     if (selected) {
  //       deinitializeSocket();
  //     }
  //   };
  // }, [selected]);

  const censorMessage = (message) => {
    const regex = new RegExp(`\\b(${filteredWords.join('|')})\\b`, 'gi');
    return message.replace(regex, '****');
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${ampm}`;
  };

  const sendMessage = () => {
    if (inputValue.trim()) {
      const cleanMessage = censorMessage(inputValue);
      setMessages([
        ...messages,
        { text: cleanMessage, sender: 'sender', time: getCurrentTime() }
      ]);
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

  // funtion for drop-down

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // funtion for extension model //

  const [isOpenexmodel, setIsOpenexmodel] = useState(false);

  const openModal = () => setIsOpenexmodel(true);
  const closeModal = () => setIsOpenexmodel(false);

  return (
    <>
      {isOpenexmodel && (
        <div className="extension-modal-overlay">
          <div className="extension-modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h1 className="text-2xl">slot extension</h1>
            <h1 className="text-xl text-center my-4">Extent your duration</h1>
            <Extensionbtn />
          </div>
        </div>
      )}
      <div className="chat-window">
        <div className="chat-header">
          <div className="chatheader">
            <div className="user-details">
              <div className="flex">
                <div className="mt-2 mx-2 chatbackbtn" onClick={backbtn}>
                  <IoIosArrowBack color="black" size={25} />
                </div>
                <img
                  src={BASEURL + '/UserPhotos/companion1.jpg'}
                  alt="profile"
                  width={20}
                  height={20}
                />
                <div className="ml-5 my-1">
                  <h1 className=" font-bold">{selected.companion.firstname}</h1>
                  <p className="text-xs text-pink-700 ml-1 font-light">
                    Online
                  </p>
                </div>
              </div>
              <div className="callbtn" onClick={handlePhoneCall}>
                <IoCallOutline size={20} color="white" />
                <h1 className="text-lg">call</h1>
              </div>
              <div className="mt-3 mr-4" onClick={toggleDropdown}>
                <BsThreeDotsVertical color="pink" size={30} />
              </div>
              {/* Dropdown Menu */}
              {isOpen && (
                <ul className="dropdown-menu-extension">
                  <div className="extension-slote" onClick={openModal}>
                    slote extension
                  </div>
                </ul>
              )}
            </div>
          </div>
          <div className="timer">
            <Timer />
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
                <br />
                <p className="msgtime">{msg.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-input">
          <div className="chat-input-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="chat-input-text"
              placeholder="type of massage"
            />
            <div className="send-button-chat flex">
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
    </>
  );
};

const Extensionbtn = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [error, setError] = useState('');

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setError(''); // Clear the error if a slot is selected
  };

  const handleSubmit = () => {
    if (!selectedSlot) {
      setError('Please select a slot before submitting.');
      return;
    }

    console.log(`Selected slot: ${selectedSlot}`);
    setError('');
  };

  return (
    <>
      <div className="slot-extension-btn">
        <button
          className={`extent-slot-button ${selectedSlot === 1 ? 'selected' : ''}`}
          onClick={() => handleSlotClick(1)}
        >
          1 HOUR
        </button>
        <button
          className={`extent-slot-button ${selectedSlot === 2 ? 'selected' : ''}`}
          onClick={() => handleSlotClick(2)}
        >
          2 HOURS
        </button>
        <button
          className={`extent-slot-button ${selectedSlot === 3 ? 'selected' : ''}`}
          onClick={() => handleSlotClick(3)}
        >
          3 HOURS
        </button>
        <br />

        {error && <p className="text-sm text-gray-600">{error}</p>}
        <button className="extention-submit-button" onClick={handleSubmit}>
          Requested access
        </button>
        <h1 className="text-center text-sm text-gray-600">
          Your Request is under process
        </h1>
      </div>
    </>
  );
};

const Timer = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        const newMinutes = (prevTime.minutes + 1) % 60;
        const newHours =
          prevTime.minutes + 1 === 60 ? prevTime.hours + 1 : prevTime.hours;

        // Stop the timer when it reaches 2 hours
        if (newHours === 2 && newMinutes === 0) {
          clearInterval(timer);
          return prevTime; // Stop updating
        }

        return { hours: newHours, minutes: newMinutes };
      });
    }, 60000); // Updates every 60 seconds

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, []);
  return (
    <>
      <div className="countup-container">
        <div className="countup-box">
          <div className="countup-time">
            {time.hours.toString().padStart(2, '0')}
          </div>
          <div className="countup-label">Hrs</div>
        </div>
        <div className="countup-box">
          <div className="countup-time">
            {time.minutes.toString().padStart(2, '0')}
          </div>
          <div className="countup-label">Mins</div>
        </div>
      </div>
    </>
  );
};

export default chatwindow;
