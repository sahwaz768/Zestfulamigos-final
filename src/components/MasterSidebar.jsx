import Sidebar from './sidebar';
import { MdLogout, MdOutlineReportProblem } from 'react-icons/md';
import { RiChatSmile3Line } from 'react-icons/ri';
import { MdOutlineHistory } from 'react-icons/md';
import { CiSettings } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';

export const Mastersidebar = ({ isCompanion }) => {
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
          route: '/page-one/raise-concern',
          icon: MdOutlineReportProblem
        },
        { label: 'Logout', icon: MdLogout, handleclick: handleLogout }
      ]
    }
  ];
  if (isCompanion)
    menuItems.unshift({
      label: 'Dashboard',
      route: './dashboard',
      icon: MdOutlineReportProblem
    });

  if (!userDetails) return <div>Loading...</div>;
  return (
    <>
      <Sidebar menuItems={menuItems} userDetails={userDetails} />
    </>
  );
};
