import React from "react";
import Header from "@/components/Header";
import Image from "next/image";
import Profile from "@/app/homepageimg.jpg";
import { RiChatSmile3Line } from "react-icons/ri";
import { FaHistory } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

const page = () => {
  return (
    <div>
      <Header />
      <div className="chat-top-box flex">
        <div className="sidebartop">
          <div>
            <nav>
              <ul className="sidebar">
                <li className="sidebarprofiletop">
                  <Image src={Profile} alt="profile"/>

                  <div className="ml-4 sidebarprofile">
                    <h1 className="font-extrabold text-lg">Olivia Rhye</h1>
                    <p className="text-xs">olivia@gmail.com</p>
                  </div>
                </li>
                <li className="menu-item">
                  <span className="icon">
                    <CgProfile color="black" size={20} />
                  </span>
                  <span className="label text-sm">profile setting</span>
                </li>
                <li className="menu-item">
                  <span className="icon">
                    <RiChatSmile3Line color="black" size={20} />
                  </span>
                  <span className="label text-sm">Chat</span>
                </li>
                <li className="menu-item">
                  <span className="icon">
                    <FaHistory color="black" size={20} />
                  </span>
                  <span className="label text-sm">Booking history</span>
                </li>

                <li className="menu-item">
                  <span className="icon">
                    <BiLogOutCircle color="black" size={20} />
                  </span>
                  <span className="label text-sm">Logout</span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="chatlist">
          <h1 className="text-sm font-bold mt-5 mb-2"> Chats</h1>
          <div className="userlist">
            <div className="userdetail flex items-center ">
              <div>
                <Image src={Profile} alt="Picture of the user" />
              </div>
              <div>
                <h1 className="text-sm ml-3">Olivia</h1>
              </div>
              <div className="userstatus">
                <h1 className="text-xs ">today</h1>
              </div>
            </div>
            <div className="userdetail flex items-center ">
              <div>
                <Image src={Profile} alt="Picture of the user" />
              </div>
              <div>
                <h1 className="text-sm ml-3">Olivia</h1>
              </div>
              <div className="userstatus">
                <h1 className="text-xs ">today</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;