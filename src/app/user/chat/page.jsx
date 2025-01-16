'use client';
import React from 'react';
import Image from 'next/image';
import Profile from '@/app/homepageimg.jpg';
import Chatwindow from '@/components/chatwindow';
import withAuth from '@/app/hoc/wihAuth';
import Secondsidebaruser from '@/components/ChatSideBar';
import Chatheader from '@/components/ChatHeader';


const Page = React.memo((props) => {
  const handleResize = () => {
    if (window.matchMedia('(min-width: 768px)').matches) {
      showchat1();
    } else {
      showchat();
    }
  };

  const showchat1 = () => {
    document.getElementById('chatwindow').style.display = 'block';
  };

  const showchat = () => {
    document.getElementById('chatlist').style.display = 'none';
    document.getElementById('chatwindow').style.display = 'block';
  };
  return (
    <>
      <Chatheader />
      <div className="chatpage">
        <div>
          <Secondsidebaruser/>
        </div>
        <div className="chatsection">
          <div className="chatlist" id="chatlist">
            <div className=" chatlistbox">
              <h1 className="">Chats</h1>
            </div>
            <div className="userlistbox">
              <div className="userdetail" onClick={handleResize}>
                <Image src={Profile} alt="profile" />
                <h1 className="ml-2 text-sm">Alisha</h1>
                <div className="userstatus text-xs">today</div>
              </div>
              <div className="userdetail">
                <Image src={Profile} alt="profile" />
                <h1 className="ml-2 text-sm">Berlin</h1>
                <div className="userstatus text-xs">today</div>
              </div>
            </div>
          </div>
          <div className="chatwindow" id="chatwindow">
            <Chatwindow />
          </div>
        </div>
      </div>
    </>
  );
});

export default withAuth(Page);
