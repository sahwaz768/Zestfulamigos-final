'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { IoCallOutline } from 'react-icons/io5';
import { VscSend } from 'react-icons/vsc';
import { CiLocationOn } from 'react-icons/ci';
import { IoIosArrowBack } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BASEURL } from '@/Constants/services.constants';
import { socketinit } from '@/Constants/socket.io.config';
import dynamic from 'next/dynamic';

const Extensionbtn = dynamic(() => import('./extentionslotmodel'), {
  ssr: false
});

const chatwindow = ({ selected }) => {
  const socket = socketinit.socket();
  const [messagedata, setMessageData] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const filteredWords = ['badword1', 'badword2'];

  useEffect(() => {
    const initializeSocket = async () => {
      const { setCookie, parseCookies } = await import('nookies');
      const { deletecookie } = await import('../utils/removeUserData');
      const cookie = parseCookies();
      const { getAccessTokenFromRefreshTokenService } = await import(
        '../services/auth/login.service'
      );
      const { ACCESS_TOKEN_LOC } = await import(
        '../Constants/common.constants'
      );
      const sendData = {
        roomid: selected.id,
        userid: selected.user?.id
      };

      const verifyFriendOnline = (data) => {
        const selectedUser = data.users?.find(
          (l) => l.username === selected?.user?.username
        );
      };
      socket.on('joinedUser', (data) => {
        const values = data.map((l) => ({
          text: l.body,
          id: l.id,
          sender: l.senderid === selected.userid ? 'receiver' : 'sender',
          time: new Date(l.createdAt).toLocaleString('en-US', {
            hour: 'numeric',
            hour12: true
          })
        }));
        setMessageData(() => values);
      });

      socket.on('message', (data) => {
        const values = data.map((l) => ({
          text: l.body,
          id: l.id,
          sender: l.senderid === selected.userid ? 'receiver' : 'sender',
          time: new Date(l.createdAt).toLocaleString('en-US', {
            hour: 'numeric',
            hour12: true
          })
        }));
        setMessageData(() => values);
      });

      // socket.on('leaveroom', (data) => {
      //   verifyFriendOnline(data);
      //   setMessageData(() => data);
      // });

      socket.on('tokenexpired', () => {
        console.log('TokenExpired Emitted');
        socketinit.removetoken();
        // getRefreshToken().then((token) => {
        //   socket.auth = { token: 'Bearer ' + token };
        //   socket.disconnect().connect();
        //   socketinit.addtoken((token) || '');
        //   const lastEmit = cookie['lastEmit'];
        //   if (lastEmit) {
        //     const emitted = JSON.parse(lastEmit || '{}');
        //     Object.keys(emitted).forEach((l) => {
        //       setTimeout(() => socket.emit(l, emitted[l]), 500);
        //     });
        //     deletecookie('lastEmit');
        //   }
        // });
      });

      socket.on('invalidUser', () => {
        const token = cookie[ACCESS_TOKEN_LOC];
        console.log('InvalidUser Emitted', token);
        if (token) {
          socketinit.addtoken(token || '');
          const lastEmit = JSON.parse(get('lastEmit') || '{}');
          if (lastEmit && Object.keys(lastEmit).length) {
            Object.keys(lastEmit).forEach((l) => {
              socket.emit(l, lastEmit[l]);
              deletecookie('lastEmit');
            });
          }
        }
      });

      setCookie(
        null,
        'lastEmit',
        JSON.stringify({
          joinchatroom: sendData
        }),
        { path: '/' }
      );
      socket.emit('joinchatroom', sendData);
      console.log('Joinchatroomemitted');
    };
    if (selected) {
      initializeSocket();
    }
    return () => {
      const deinitializeSocket = async () => {
        // const { setCookie } = await import('nookies');

        console.log('Disconnected');
        // socket.emit('leavechatroom', {
        //   roomid: selected.id,
        //   username
        // });
        // setCookie(
        //   null,
        //   'lastEmit',
        //   JSON.stringify({
        //     leavechatroom: { roomid: selected.id, username }
        //   }),
        //   { path: '/' }
        // );
      };
      if (selected) {
        socket.disconnect();
      }
    };
  }, [selected]);

  const censorMessage = (message) => {
    const regex = new RegExp(`\\b(${filteredWords.join('|')})\\b`, 'gi');
    return message.replace(regex, '****');
  };

  const sendNewMessage = useCallback(
    async (content) => {
      if (inputValue && content) {
        // set(
        //   'lastEmit',
        //   JSON.stringify({
        //     sendMessage: { roomid: selected.chatroomid, username, message }
        //   }),
        //   { expires: 1 / 288 }
        // );
        socket.emit('sendMessage', {
          roomid: selected.id,
          userid: selected.user?.id,
          message: {
            content,
            sender: selected.user?.id
          }
        });
        setInputValue('');
        // socket.on('tokenexpired', () => {
        //   getRefreshToken().then((token) => {
        //     socket.auth = { token: 'Bearer ' + token };
        //     socket.disconnect().connect();
        //     socketinit.addtoken((token as string) || '');
        //     socket.emit('sendMessage', {
        //       roomid: selected.chatroomid,
        //       username,
        //       message
        //     });
        //   });
        // });
      }
    },
    [inputValue]
  );

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
      {isOpenexmodel && <Extensionbtn closeModal={closeModal} bookingid={selected.booking} />}
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
              <div
                className="mt-3 mr-4"
                onClick={toggleDropdown}
                style={{ cursor: 'pointer' }}
              >
                <BsThreeDotsVertical color="pink" size={30} />
              </div>
              {/* Dropdown Menu */}
              {isOpen && (
                <div>
                  {/* {selected.session && selected.session?.length && ( */}
                    <ul
                      className="dropdown-menu-extension"
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="extension-slote" onClick={openModal}>
                        slote extension
                      </div>
                    </ul>
                  {/* )} */}
                </div>
              )}
            </div>
          </div>
          <div className="timer">
            <Timer />
          </div>
          <div className="chat-body">
            {messagedata &&
              messagedata.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender}`}>
                  {msg.text}
                  <br />
                  <p className="msgtime">{msg.time}</p>
                </div>
              ))}
          </div>
        </div>

        <div
          className="chat-input"
          onKeyUp={(e) => e.key === 'Enter' && sendNewMessage(inputValue)}
        >
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
              <div
                className="msgsendbtn"
                onClick={() => sendNewMessage(inputValue)}
              >
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
