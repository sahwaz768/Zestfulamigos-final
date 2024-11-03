'use client'
import React from "react";
import { RiChatSmile3Line } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { MdManageHistory } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import Image from "next/image";
import Profile from "@/app/homepageimg.jpg";
import { IoIosNotificationsOutline } from "react-icons/io";

import Chatwindow from "@/components/chatwindow";

const page = () => {
  const handleResize = () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
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
<h1 className="chatzestful">zestful amigos</h1>
 <div className="chatpage">
      <nav>
        <ul className="sidebar">
          <li className="menu-item">
            <span className="icon">
              <IoHomeOutline color="black" size={20} />
            </span>
            <span className="label">Home</span>
          </li>
          <li className="menu-item">
            <span className="icon">
              <RiChatSmile3Line color="black" size={20} />
            </span>
            <span className="label">Chat</span>
          </li>
          <li className="menu-item">
            <span className="icon">
              <MdManageHistory color="black" size={20} />
            </span>
            <span className="label">booking history</span>
          </li>
          <li className="menu-item">
            <span className="icon">
              <BiLogOutCircle color="black" size={20} />
            </span>
            <span className="label">logout</span>
          </li>
          <li className="sidebarprofiletop">
            <Image src={Profile} alt="profile" className="last-profile" />

            <div className=" sidebarprofile ml-4 flex">
              <h1 className="label">Olivia Rhye</h1>
            </div>
          </li>
        </ul>
      </nav>
     
    
     
      <div className="chatsection">
        <div className="chatlist" id="chatlist" >
          <div className=" chatlistbox">
          <h1 className="">Chats</h1>
          <div className="notify">
          <IoIosNotificationsOutline  color="black" size={20}/>
         
          </div>
          
          </div>
          <div className="userlistbox">
           <div className="userdetail" onClick={handleResize}>
           <Image src={Profile} alt="profile" />
           <h1 className="ml-2 text-sm">Alisha</h1>
           <div className="userstatus text-xs">
            today
           </div>
           </div>
           <div className="userdetail">
           <Image src={Profile} alt="profile" />
           <h1 className="ml-2 text-sm">Berlin</h1>
           <div className="userstatus text-xs">
            today
           </div>
           </div>
          </div>
        </div>
        <div className="chatwindow" id="chatwindow">
          <Chatwindow/>
        </div>
      </div>
      </div>
      
      </>

    

    
  );
};

export default page;
