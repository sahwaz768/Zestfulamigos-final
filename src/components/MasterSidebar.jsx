import Sidebar from './sidebar';
import { MdLogout, MdOutlineReportProblem } from 'react-icons/md';
import { RiChatSmile3Line } from 'react-icons/ri';
import { MdOutlineHistory } from 'react-icons/md';
import { CiSettings } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import { MdOutlineSwipe } from "react-icons/md";
import { FaCheckToSlot } from "react-icons/fa6";
import Loadingbar from './Loadingbar';

export const Mastersidebar = ({ isCompanion, className }) => {
  const userDetails = useSelector((state) => state.AuthReducer.data);
  
  const handleLogout = async () => {
    const { logoutUserService } = await import(
      '../services/auth/logout.service'
    );
    const { removeUserData } = await import('../utils/removeUserData');
    await logoutUserService();
    await removeUserData();
    redirect('/');
  };

  const menuItems = [
    { label: 'Chats', route: './chat', icon: RiChatSmile3Line },
    {
      label: 'Booking History',
      route: './bookinghistory',
      icon: MdOutlineHistory
    },
    {
      label: 'Settings',
      icon: CiSettings,
      isDropdown: true,
      dropdownItems: [
        { label: 'Profile Settings', route: './profile' },
        {
          label: 'Raise a Concern',
          route: './concern',
          icon: MdOutlineReportProblem
        },
        // Conditionally add Analysis to dropdown if isCompanion
        ...(isCompanion ? [{
          label: 'Analysis',
          route: './Analysis',
          icon: MdOutlineReportProblem
        }] : []),
         ...(isCompanion ? [{
          label: 'Availability',
          route: './slot',
          icon: FaCheckToSlot
        }] : []),
        { label: 'Logout', icon: MdLogout, handleclick: handleLogout }
      ]
    }
  ];

  // Add items to beginning of array based on isCompanion
  if (isCompanion) {
    menuItems.unshift({
      label: 'Dashboard',
      route: './dashboard',
      icon: MdOutlineReportProblem
    });
   
  } else {
    menuItems.unshift({
      label: 'Choose Companion',
      route: '/user/genderchoose',
      icon: MdOutlineSwipe
    });
  }

  if (!userDetails) return <div><Loadingbar/></div>;
  
  return (
    <>
      <Sidebar menuItems={menuItems} userDetails={userDetails} className={className} />
    </>
  );
};