'use client';
import { useEffect, memo } from 'react';
import Image from 'next/image';
import { RiChatSmile2Line } from 'react-icons/ri';
import { MdHistory } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { IoTicketOutline } from 'react-icons/io5';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectAuthData } from '@/Redux/auth/auth.reducer';
import Loadingbar from './Loadingbar';
import { BASEURL } from '@/Constants/services.constants';
import { redirect } from 'next/navigation';

const HeaderProfileButton = ({ handleClose, dropdownRef }) => {
  const userDetails = useSelector(selectAuthData);
  const handleLogout = async () => {
    const { logoutUserService } = await import(
      '@/services/auth/logout.service'
    );
    const { removeUserData } = await import('@/utils/removeUserData');
    await logoutUserService();
    await removeUserData();
    redirect('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!userDetails) {
    return <Loadingbar />;
  }
  return (
    <div className="dropdown-menu-profilebtn">
      <div className="notificationsvg-second">
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
          <path d="M25.5 13H0.5L12.5 0L25.5 13Z" fill="white" />
        </svg>
      </div>
      <div className="dropdown-profilebtnbox p-4">
        <div className="flex justify-center">
          <Image
            src={BASEURL + '/' + userDetails.Images[0]}
            alt="this is profile"
            height={120}
            width={120}
          />
        </div>
        <div className="text-center font-bold my-2">{userDetails.name}</div>
        <hr />
        <Link href={'./chat'}>
          <div className="flex gap-4 mt-1 p-2 hover:bg-red-400 rounded-lg cursor-pointer">
            <RiChatSmile2Line color="black" size={25} />
            <h1 className="text-sm">Chats</h1>
          </div>
        </Link>
        <Link href={'./bookinghistory'}>
          <div className="flex gap-4 p-2 hover:bg-red-400 rounded-lg cursor-pointer">
            <MdHistory color="black" size={25} />
            <h1 className="text-sm">Booking history</h1>
          </div>
        </Link>
        <Link href={'./profile'}>
          <div className="flex gap-4 p-2 hover:bg-red-400 rounded-lg cursor-pointer">
            <CgProfile color="black" size={25} />
            <h1 className="text-sm">Profile</h1>
          </div>
        </Link>
        <Link href={'./concern'}>
          <div className="flex gap-4 p-2 hover:bg-red-400 rounded-lg cursor-pointer">
            <IoTicketOutline color="black" size={25} />
            <h1 className="text-sm">Raise a concern</h1>
          </div>
        </Link>
        <div
          className="flex gap-4 p-2 hover:bg-red-400 rounded-lg cursor-pointer"
          onClick={handleLogout}
        >
          <RiLogoutBoxLine color="black" size={25} />
          <h1 className="text-sm">Logout</h1>
        </div>
      </div>
    </div>
  );
};

export default memo(HeaderProfileButton);
