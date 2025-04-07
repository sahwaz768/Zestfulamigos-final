'use client';
import { useState } from 'react';
import Image from 'next/image';
import Masterheader from './Masterheader';
import { Mastersidebar } from './MasterSidebar';
import Notify from './Notify';
import Chatwindow from './chatwindow';
import { formatBookingTime } from '@/utils/bookings.utils';
import Mailbox from '@/shared/Assets/mailbox.png';
import Logo from '@/shared/Assets/nobglogo.png';
import Link from 'next/link';
import Verifyemail from '@/shared/Assets/verifyemail.png';

const ChatComponent = ({ chatrooms, isCompanion, isEmailVerified }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  const handleSelectChat = (id) => {
    setSelectedChat(id);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: './aboutus' },
    { name: 'Privacy Policy', href: './privacypolicy' },
    { name: 'Contact', href: './contactus' }
  ];
  return (
    <>
      <Masterheader
        backgroundColor="rgba(250, 236, 236, 0.8)"
        navLinks={navLinks}
      />
      <div className="notifymbsecond">
        <Notify backgroundColor="transparent" color="black" />
      </div>
      <div className="chatpage">
        <div>
          <Mastersidebar
            isCompanion={isCompanion}
            className="sbar-height-chat"
          />
        </div>
        <div className="chatsection">
          {isMobile && selectedChat ? null : (
            <div className="chatlist" id="chatlist">
              <div className=" chatlistbox">
                <h1 className="">Chats</h1>
              </div>
              <div className="userlistbox">
                {!isEmailVerified ? (
                  <div>
                    <div className="email-verificationbox">
                      <Image src={Verifyemail} alt="mailbox image" />
                    </div>
                    <h1 className="text-center font-extrabold mt-3 text-normal text-red-700">
                      Please verify your email to see your chats.
                    </h1>
                    <h1 className="text-center text-xs mt-2 px-3">
                      Stay connected seamlessly and enjoy uninterrupted chats.
                    </h1>
                  </div>
                ) : chatrooms?.length ? (
                  chatrooms.map((l) => (
                    <div
                      className="userdetail"
                      onClick={() => handleSelectChat(l)}
                      key={l.id}
                      style={{ cursor: 'pointer' }}
                    >
                      <Image
                        src={
                          isCompanion
                            ? l.user?.Images[0]
                            : l.companion?.Images[0]
                        }
                        alt="profile"
                        width={20}
                        height={20}
                      />
                      <h1 className="ml-2 text-sm">
                        {isCompanion ? l.user.firstname : l.companion.firstname}
                      </h1>
                      <div className="userstatus text-xs">
                        {formatBookingTime(l.booking.bookingstart)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <div className="no-chatbox">
                      <Image src={Mailbox} alt="mailbox image" />
                    </div>
                    <h1 className="text-center font-extrabold mt-3">
                      No messages yet
                    </h1>
                    <h1 className="text-center text-xs mt-2">
                      Looks like you haven't initiated
                    </h1>
                    <h1 className="text-center text-xs mt-1">
                      any conversation
                    </h1>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="chatwindow" id="chatwindow">
            {selectedChat ? (
              <Chatwindow
                selected={selectedChat}
                isCompanion={isCompanion}
                setSelectedChat={setSelectedChat}
              />
            ) : (
              <div className="chat-emptyspace">
                <div className="flex justify-center">
                  <Image src={Logo} alt="logo" />
                </div>
                <h1 className="text-center font-extrabold text-red-700 text-2xl">
                  "Your perfect companion is just a choice away!"
                </h1>
                <h1 className="text-center text-sm my-3">
                  “Sit here questioning life or start a convo so legendary even
                  Shakespeare would be jealous?”
                </h1>
                <div className="flex justify-center">
                  <Link href={'/user/genderchoose'}>
                    <button className="chat-emptyspace-btn">
                      Start a conversation
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatComponent;
