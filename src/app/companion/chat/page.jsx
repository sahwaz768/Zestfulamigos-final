'use client';
import Image from 'next/image';
import Profile from '@/shared/Assets/homepageimg.jpg';
import Companionchatwindow from '@/components/companionchatwindow';
import Chatheader from '@/components/Masterheader';
import { CgProfile } from 'react-icons/cg';
import Notify from '@/components/Notify';
import { Mastersidebar } from '@/components/MasterSidebar';

const page = () => {
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

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: './aboutus' },
    { name: 'Privacy Policy', href: './privacypolicy' },
    { name: 'Contact', href: './contactus' }
  ];
  return (
    <div>
      <Chatheader
        backgroundColor="rgba(250, 236, 236, 0.8)"
        navLinks={navLinks}
      />
      <div className="notifymbsecond">
        <Notify backgroundColor="transparent" color="black" />
      </div>
      <div className="chatpage">
        <div>
          <Mastersidebar isCompanion={true}/>
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
            <Companionchatwindow />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CompanionNotification = () => {
  return (
    <>
      <div className="flex gap-2 mr-4">
        <Notify backgroundColor="black" color="white" />
        <div className="bellicon">
          <CgProfile color="white" size={20} />
        </div>
      </div>
    </>
  );
};

