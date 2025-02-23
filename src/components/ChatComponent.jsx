'use client';
import { useState } from 'react';
import Image from 'next/image';
import Masterheader from './Masterheader';
import { Mastersidebar } from './MasterSidebar';
import Notify from './Notify';
import Chatwindow from './chatwindow';
import { BASEURL } from '@/Constants/services.constants';
import { formatBookingTime } from '@/utils/bookings.utils';

const ChatComponent = ({ chatrooms, isCompanion }) => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (id) => {
    // if (window.matchMedia('(min-width: 768px)').matches) {
    // }
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
          <Mastersidebar isCompanion={isCompanion} />
        </div>
        <div className="chatsection">
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
                      src={isCompanion
                        ? BASEURL + '/' + l.user?.Images[0]
                        : BASEURL + '/' + l.companion?.Images[0]}
                      alt="profile"
                      width={20}
                      height={20}
                    />
                    <h1 className="ml-2 text-sm">
                      {isCompanion ? l.user.firstname : l.companion.firstname}
                    </h1>
                    <div className="userstatus text-xs">{formatBookingTime(l.booking.bookingstart)}</div>
                  </div>
                ))
              ) : (
                <div>No Active Chats Available</div>
              )}
            </div>
          </div>
          <div className="chatwindow" id="chatwindow">
            {selectedChat && (
              <Chatwindow selected={selectedChat} isCompanion={isCompanion} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatComponent;
