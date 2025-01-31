import { FaRegBell } from 'react-icons/fa6';
import { MdLogout, MdOutlineReportProblem } from 'react-icons/md';
import { RiChatSmile3Line } from "react-icons/ri";
import { MdOutlineHistory } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
 
 
 export const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/user/aboutus' },
    { name: 'Privacy Policy', href: '/user/privacypolicy' },
    { name: 'Contact', href: '/user/contactus' }
  ];

export const companionsidebarlink = [
    { label: 'Chats', route: './chat', icon: RiChatSmile3Line  },
    { label: 'Booking History', route: './bookinghistory', icon: MdOutlineHistory },
    { 
      label: 'Settings', 
      icon: CiSettings, 
      isDropdown: true, 
      dropdownItems: [
     //   { label: 'Profile Settings', route: '/page-one/profile-settings',  },
    //    { label: 'Raise a Concern', route: '/page-one/raise-concern', icon: MdOutlineReportProblem },
        { label: 'Logout', route: '/', icon: MdLogout },
      ] 
    },
  ];

 export const companionsidebardetail = {
    photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVtYWxlJTIwbW9kZWx8ZW58MHx8MHx8fDA%3D',
    name: 'babywamika',
    email: 'babywamika@example.com',
  };