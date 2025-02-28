'use client'
import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import Female from '@/shared/Assets/Femalegender.svg';
import { RiChatSmile2Line } from "react-icons/ri";
import { MdHistory } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoTicketOutline } from "react-icons/io5";
import Link from "next/link";

const HeaderProfileButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
   
  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="bellicon">
        <CgProfile size={20} color="white" />
      </div>
      {isOpen && (
        <div className="dropdown-menu-profilebtn">
          <div className="notificationsvg-second">
            <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
              <path d="M25.5 13H0.5L12.5 0L25.5 13Z" fill="white" />
            </svg>
          </div>
          <div className="dropdown-profilebtnbox p-4">
            <div className="flex justify-center">
              <Image src={Female} alt="this is profile" />
            </div>
            <div className="text-center font-bold my-2">Maya Thakur</div>
            <hr />
            <div className="flex gap-4 mt-1 p-2 hover:bg-red-400 rounded-lg cursor-pointer">
              <RiChatSmile2Line color="black" size={25} />
              <h1 className="text-sm">Chats</h1>
            </div>
            <div className="flex gap-4 p-2 hover:bg-red-400 rounded-lg cursor-pointer">
              <MdHistory color="black" size={25} />
              <h1 className="text-sm">Booking history</h1>
            </div>
            <div className="flex gap-4 p-2 hover:bg-red-400 rounded-lg cursor-pointer">
              <CgProfile color="black" size={25} />
              <h1 className="text-sm">Profile</h1>
            </div>
            <div className="flex gap-4 p-2 hover:bg-red-400 rounded-lg cursor-pointer">
              <IoTicketOutline color="black" size={25} />
              <h1 className="text-sm">Raise a concern</h1>
            </div>
            <Link href={'/'}>
              <div className="flex gap-4 p-2 hover:bg-red-400 rounded-lg cursor-pointer">
                <RiLogoutBoxLine color="black" size={25} />
                <h1 className="text-sm">Logout</h1>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderProfileButton;
