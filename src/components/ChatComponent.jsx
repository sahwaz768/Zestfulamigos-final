'use client';
import { useState } from 'react';
import Image from 'next/image';
import Masterheader from './Masterheader';
import { Mastersidebar } from './MasterSidebar';
import Notify from './Notify';
import Chatwindow from './chatwindow';
import { BASEURL } from '@/Constants/services.constants';
import { formatBookingTime } from '@/utils/bookings.utils';
import Mailbox from '@/shared/Assets/mailbox.png';
import Logo from '@/shared/Assets/nobglogo.png';
import Link from 'next/link';
import Locationaccess from './Locationaccess';

const ChatComponent = ({ chatrooms, isCompanion }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [blankspace, setblankspace] = useState(true);
  const [chatlist, setchatlist] = useState(true);

  const handleSelectChat = (id) => {
    if (window.matchMedia('(min-width: 768px)').matches) {
      setblankspace(false);
      setSelectedChat(id);
    } else {
      setSelectedChat(id);
      setchatlist(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: './aboutus' },
    { name: 'Privacy Policy', href: './privacypolicy' },
    { name: 'Contact', href: './contactus' }
  ];
  return (
    <>
    <Locationaccess/>
      <Masterheader
        backgroundColor="rgba(250, 236, 236, 0.8)"
        navLinks={navLinks}
      />
      <div className="notifymbsecond">
        <Notify backgroundColor="transparent" color="black" />
      </div>
      <div className="chatpage">
        <div>
          <Mastersidebar isCompanion={isCompanion} />
        </div>
        <div className="chatsection">
          {chatlist && (
            <div className="chatlist" id="chatlist">
              <div className=" chatlistbox">
                <h1 className="">Chats</h1>
              </div>
              <div className="userlistbox">
                {chatrooms?.length ? (
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
                            ? BASEURL + '/' + l.user?.Images[0]
                            : BASEURL + '/' + l.companion?.Images[0]
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
                      Looks like you haven't initiated a conversation
                    </h1>
                    <h1 className="text-center text-xs mt-1">
                      with any of our professionals
                    </h1>
                  </div>
                )}
              </div>
            </div>
          )}
          {blankspace && !selectedChat && (
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
                    start a conversation
                  </button>
                </Link>
              </div>
            </div>
          )}

          <div className="chatwindow" id="chatwindow">
            {selectedChat && (
              <Chatwindow
                selected={selectedChat}
                isCompanion={isCompanion}
                setblankspace={setblankspace}
                setchatlist={setchatlist}
                setSelectedChat={setSelectedChat}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatComponent;
