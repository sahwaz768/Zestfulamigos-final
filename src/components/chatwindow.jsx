'use client';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { IoCallOutline } from 'react-icons/io5';
import { VscSend } from 'react-icons/vsc';
import { IoIosArrowBack } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { socketinit } from '@/Constants/socket.io.config';
import { EndSessionModel, StartSessionModel, ExtensionModel } from './Models';
import { parseCookies, setCookie } from 'nookies';
import { getAccessTokenFromRefreshTokenService } from '../services/auth/login.service';
import { deletecookie } from '@/utils/removeUserData';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { containsWord } from '@/utils/chat.utils';
import { cuzzwords } from '@/shared/data/chatdata.data';
import { toast } from '@/utils/reduxtrigger.utils';
import { calculateRemainingTime, timeAgo } from '@/utils/bookings.utils';
import { IoMdAdd } from 'react-icons/io';
import { IoShareSocial } from 'react-icons/io5';
import { FiMapPin } from 'react-icons/fi';
import { Baselocationmodel } from './Models';
import { getAddressFromLatLng } from '@/utils/location';

const CountdownTimer = dynamic(() => import('@/components/CountdownTimer'), {
  ssr: false
});

const GetSessionModel = (model, selected, closeModal, sendMessage) => {
  switch (model) {
    case 'Extended':
      return (
        <ExtensionModel closeModal={closeModal} bookingid={selected.booking} />
      );

    case 'StartSession':
      return (
        <StartSessionModel
          closeModal={closeModal}
          bookingid={selected.booking}
        />
      );

    case 'EndSession':
      return (
        <EndSessionModel
          closeModal={closeModal}
          session={selected?.session[0]}
        />
      );

    case 'ShareBaseLocation':
      return (
        <Baselocationmodel
          closeModal={closeModal}
          baselocations={selected.companion.Companion[0].baselocation}
          sendlocation={(l) => sendMessage(l)}
        />
      );

    default:
      return null;
  }
};

const Chatwindow = ({ selected, isCompanion, setSelectedChat }) => {
  const socket = socketinit.getSocket();
  const [messagedata, setMessageData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isLocationOn, setisLocationOn] = useState(false);
  const dropupRef = useRef(null);

  const getAddressforCompanion = () => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { updateLiveLocation } = await import(
          '@/services/user/livelocation.service'
        );
        const { latitude, longitude } = coords;
        const values = await getAddressFromLatLng(latitude, longitude);
        await updateLiveLocation(values, selected.booking.id);
      },
      async () => {
        const { toast } = await import('@/utils/reduxtrigger.utils');
        toast.error('Please switch on the location');
      }
    );
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropupRef.current && !dropupRef.current.contains(event.target)) {
        closeModal();
      }
    }
    let interval = null;
    navigator.geolocation.getCurrentPosition(
      () => setisLocationOn(true),
      () => setisLocationOn(false)
    );
    if (
      isCompanion &&
      Math.floor(
        calculateRemainingTime(selected.booking.bookingstart) / (1000 * 60 * 60)
      ) < 2
    ) {
      interval = setInterval(() => {
        getAddressforCompanion();
      }, 300000);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      socketinit.disconnect();
      document.removeEventListener('mousedown', handleClickOutside);
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  useEffect(() => {
    const initializeSocket = async () => {
      const cookie = parseCookies();
      const sendData = {
        roomid: selected.id,
        userid: isCompanion ? selected.companion?.id : selected.user?.id
      };
      socket.on('joinedUser', (data) => {
        const userId = isCompanion ? selected.companion?.id : selected.user?.id;
        const values = data.map((l) => ({
          text: l.body,
          id: l.id,
          sender: l.senderid === userId ? 'sender' : 'receiver',
          time: timeAgo(l.createdAt)
        }));
        setMessageData(() => values);
      });

      socket.on('message', (data) => {
        const userId = isCompanion ? selected.companion?.id : selected.user?.id;
        const values = data.map((l) => ({
          text: l.body,
          id: l.id,
          sender: l.senderid === userId ? 'sender' : 'receiver',
          time: timeAgo(l.createdAt)
        }));
        setMessageData(() => values);
      });

      socket.on('tokenexpired', () => {
        socketinit.removetoken();
        getAccessTokenFromRefreshTokenService().then((token) => {
          socket.auth = { token: 'Bearer ' + token };
          socket.disconnect().connect();
          socketinit.addtoken(token || '');
          const lastEmit = cookie['lastEmit'];
          if (lastEmit) {
            const emitted = JSON.parse(lastEmit || '{}');
            Object.keys(emitted).forEach((l) => {
              setTimeout(() => socket.emit(l, emitted[l]), 500);
            });
            deletecookie('lastEmit');
          }
        });
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
        { path: '/', maxAge: 8 * 60 * 60, secure: true, sameSite: 'Lax' }
      );
      socket.emit('joinchatroom', sendData);
    };
    if (selected) {
      initializeSocket();
    }
    return () => {
      socketinit.disconnect();
    };
  }, [selected]);

  const sendNewMessage = useCallback(
    async (content) => {
      if (content) {
        if (inputValue && containsWord(cuzzwords, inputValue)) {
          toast.error('You are violating the rules! please mind the words!');
        } else if (/\bhttps?:\/\/[^\s/$.?#].[^\s]*\b/gi.test(inputValue)) {
          toast.error('You are violating the rules!');
          return;
        }
        setCookie(
          null,
          'lastEmit',
          JSON.stringify({
            sendMessage: {
              roomid: selected.id,
              userid: isCompanion ? selected.companion?.id : selected.user?.id,
              message: {
                content,
                sender: isCompanion ? selected.companion?.id : selected.user?.id
              }
            }
          }),
          { path: '/', maxAge: 8 * 60 * 60, secure: true, sameSite: 'Lax' }
        );
        socket.emit('sendMessage', {
          roomid: selected.id,
          userid: isCompanion ? selected.companion?.id : selected.user?.id,
          message: {
            content,
            sender: isCompanion ? selected.companion?.id : selected.user?.id
          }
        });
        setInputValue('');
      }
    },
    [inputValue]
  );

  const handlePhoneCall = () => {
    const phoneNumber = '+1234567890';
    window.location.href = `tel:${phoneNumber}`;
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [isOpenexmodel, setIsOpenexmodel] = useState(null);

  const openModal = (model) => setIsOpenexmodel(model);
  const closeModal = () => {
    setIsOpenexmodel(null);
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const SessionDropDown = () => {
    if (isCompanion && !selected.session?.length) {
      return (
        <ul className="dropdown-menu-extension" style={{ cursor: 'pointer' }}>
          <div
            className="extension-slote"
            onClick={() => openModal('StartSession')}
          >
            start session
          </div>
        </ul>
      );
    } else if (isCompanion && selected.session && selected.session?.length) {
      return (
        <ul className="dropdown-menu-extension" style={{ cursor: 'pointer' }}>
          <div
            className="extension-slote mt-2"
            onClick={() => openModal('EndSession')}
          >
            end session
          </div>
        </ul>
      );
    } else if (
      selected.session &&
      selected.session?.length &&
      !selected?.session[0]?.isExtended
    ) {
      return (
        <ul className="dropdown-menu-extension" style={{ cursor: 'pointer' }}>
          <div
            className="extension-slote"
            onClick={() => openModal('Extended')}
          >
            slote extension
          </div>
        </ul>
      );
    }
    return null;
  };
  return (
    <>
      {isOpenexmodel &&
        GetSessionModel(isOpenexmodel, selected, closeModal, sendNewMessage)}
      <div className="chat-window">
        <div className="chat-header">
          <div className="chatheader">
            <div className="user-details">
              <div className="flex">
                <div
                  className="mt-2 mx-2 chatbackbtn"
                  onClick={() => setSelectedChat(null)}
                >
                  <IoIosArrowBack color="black" size={25} />
                </div>
                <img
                  src={
                    isCompanion
                      ? selected.user?.Images[0]
                      : selected.companion?.Images[0]
                  }
                  alt="profile"
                  width={20}
                  height={20}
                />
                <div className="ml-5 my-1">
                  <h1 className=" font-bold">
                    {isCompanion
                      ? selected.user.firstname
                      : selected.companion.firstname}
                  </h1>
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
              {isOpen && SessionDropDown()}
            </div>
          </div>
          <div className="timer">
            {selected.session?.length && (
              <CountdownTimer
                startTime={Number(selected.booking.bookingstart)}
                endTime={Number(selected.booking.bookingend)}
              />
            )}
          </div>
          <div className="chat-body">
            {messagedata &&
              messagedata.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender}`}>
                  {msg.text.includes('https://www.google.com/maps') ? (
                    <a href={msg.text} target="_blank">
                      {msg.text}
                    </a>
                  ) : (
                    msg.text
                  )}
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
              placeholder="Let's Chat"
            />
            <div className="send-button-chat flex">
              <div
                className="flex justify-center items-center mx-4"
                onClick={() => openModal('OpenLocationOption')}
              >
                <IoMdAdd color="white" size={25} />
              </div>
              {isOpenexmodel && isOpenexmodel === 'OpenLocationOption' ? (
                <div
                  className="absolute bottom-full mb-2 w-48 bg-white shadow-lg rounded-md  border border-gray-200"
                  ref={dropupRef}
                >
                  <ul>
                    {isCompanion ? (
                      <li
                        className="p-2 rounded-md hover:bg-red-500 cursor-pointer text-xs flex items-center gap-2 "
                        onClick={() => openModal('ShareBaseLocation')}
                      >
                        <IoShareSocial color="red" size={20} /> Share Your
                        baselocation
                      </li>
                    ) : null}
                    {Math.floor(
                      calculateRemainingTime(selected.booking.bookingstart) /
                        (1000 * 60 * 60)
                    ) < 1 && isLocationOn ? (
                      <Link
                        href={`${isCompanion ? '/companion' : '/user'}/livetracker/?bookingId=${selected.booking.id}`}
                        legacyBehavior
                      >
                        <a target="_blank" rel="noopener noreferrer">
                          <li className="p-2 rounded-md hover:bg-red-500 cursor-pointer text-xs flex items-center gap-2">
                            <FiMapPin color="red" size={20} /> Track
                            {isCompanion ? 'User' : 'Companion'}
                          </li>
                        </a>
                      </Link>
                    ) : null}
                  </ul>
                </div>
              ) : null}
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

export default Chatwindow;
