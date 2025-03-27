'use client';
import React, { useCallback, useEffect, useState,useRef } from 'react';
import { IoCallOutline } from 'react-icons/io5';
import { VscSend } from 'react-icons/vsc';
import { CiLocationOn } from 'react-icons/ci';
import { IoIosArrowBack } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BASEURL } from '@/Constants/services.constants';
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
import { timeAgo } from '@/utils/bookings.utils';
import { IoMdAdd } from 'react-icons/io';
import { IoShareSocial } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";
import { Baselocationmodel } from './Models';

const CountdownTimer = dynamic(() => import('@/components/CountdownTimer'), {
  ssr: false
});

const GetSessionModel = (model, selected, closeModal) => {
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

    default:
      return null;
  }
};

const Chatwindow = ({ selected, isCompanion, setSelectedChat }) => {
  const socket = socketinit.socket();
  const [messagedata, setMessageData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isOpenup, setIsOpenup] = useState(false);
  const dropupRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    function handleClickOutside(event) {
      if (dropupRef.current && !dropupRef.current.contains(event.target)) {
        setIsOpenup(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
      if (selected) {
        socket.disconnect();
      }
    };
  }, [selected]);

  const sendNewMessage = useCallback(
    async (content) => {
      if (inputValue && content) {
        if (containsWord(cuzzwords, inputValue)) {
          toast.error('You are violating the rules! please mind the words!');
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
  return (
    <>
      {isOpenexmodel && GetSessionModel(isOpenexmodel, selected, closeModal)}
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
                      ?  selected.user?.Images[0]
                      :  selected.companion?.Images[0]
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
              {/* Dropdown Menu */}
              {isOpen && (
                <div>
                  <ul
                    className="dropdown-menu-extension"
                    style={{ cursor: 'pointer' }}
                  >
                    {isCompanion ? (
                      <>
                        {selected.session && selected.session?.length ? (
                          <div
                            className="extension-slote mt-2"
                            onClick={() => openModal('EndSession')}
                          >
                            end session
                          </div>
                        ) : (
                          <div
                            className="extension-slote"
                            onClick={() => openModal('StartSession')}
                          >
                            start session
                          </div>
                        )}
                      </>
                    ) : selected.session &&
                      selected.session?.length &&
                      !selected?.session[0]?.isExtended ? (
                      <div
                        className="extension-slote"
                        onClick={() => openModal('Extended')}
                      >
                        slote extension
                      </div>
                    ) : null}
                  </ul>
                </div>
              )}
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
              placeholder="Let's Chat"
            />
            <div className="send-button-chat flex" >
              <div className="flex justify-center items-center mx-4" onClick={() => setIsOpenup(!isOpenup)}  >
                <IoMdAdd color="white" size={25} />
              </div>
              {isOpenup && (
                <div className="absolute bottom-full mb-2 w-48 bg-white shadow-lg rounded-md p-1 border border-gray-200" ref={dropupRef}>
                  <ul>
                    <li className="p-2 rounded-md hover:bg-red-500 cursor-pointer text-xs flex items-center gap-2 " onClick={() => setIsModalOpen(true)}>
                    <IoShareSocial color="red" size={20} />   Share Your baselocation
                    </li>
                    <li className="p-2 rounded-md hover:bg-red-500 cursor-pointer text-xs flex items-center gap-2">
                    <FiMapPin color='red' size={20} /> Track Companion/user
                    </li>
                  
                  </ul>
                </div>
              )}
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

      {isModalOpen && <Baselocationmodel closeModal={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Chatwindow;
