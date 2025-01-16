import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import MenuItem from "./MenuItem";
import { CgProfile } from "react-icons/cg";
import Profile from '@/app/homepageimg.jpg';
import { MdOutlineArrowDropDown, MdOutlineHistory, MdOutlineReportProblem } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { RiChatSmile2Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";

const Secondsidebaruser = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const toggleSidebar = () => {
    if (isSidebarExpanded) {
      setIsSettingsOpen(false); // Close dropdown when sidebar is collapsed
    }
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const userDetails = useSelector((state) => state.AuthReducer.data);
  if (!userDetails) return <p>Loading...</p>;

  return (
    <div>
      <>
        <div
          className={`sidebar-second ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}
          onMouseEnter={() => setIsSidebarExpanded(true)}
          onMouseLeave={() => {
            setIsSidebarExpanded(false);
            setIsSettingsOpen(false); // Close dropdown on sidebar collapse
          }}
        >
          <div className="menu-container-second">
            {/* Profile */}
            <div className="menu-item-second-x">
              <div className="icon-container-second">
                <Image src={Profile} alt="profile" />
              </div>
              <div className="menu-label-second ">
                <span className="">
                  {userDetails ? userDetails.name : 'Olivia Rhye'}
                </span>
                <p className="text-xs text-gray-600">Olivia@gmail.com</p>
              </div>
            </div>

            {/* Refresh */}
            <MenuItem
              icon={<RiChatSmile2Line color="black" size={20} />}
              label="Chat"
            />
            {/* History */}
            <div className="menu-item-second">
              <div className="icon-container-second">
                <MdOutlineHistory color="black" size={20} />
              </div>
              <span className="menu-label-second">Booking history</span>
            </div>

            {/* Settings */}
            <div className="menu-item-second" onClick={toggleSettings}>
              <div className="icon-container-second">
                <IoSettingsOutline color="black" size={20} />
              </div>
              <span className="menu-label-second">Settings</span>
              <div className="sidebar-dropdown-btn">
                <MdOutlineArrowDropDown color="black" size={25} />
              </div>
            </div>

            {isSettingsOpen && (
              <div className="submenu ">
                <div className="">
                  <div className="menu-item-second flex ml-4">
                    <CgProfile color="black" size={20} />
                    <span className="menu-label-second">Profile Settings</span>
                  </div>
                </div>
                <div className="menu-item-second flex ml-4 mt-2">
                  <MdOutlineReportProblem color="black" size={20} />
                  <span className="menu-label-second">Raise a concern</span>
                </div>
                <div className="menu-item-second flex ml-4 mt-2">
                  <CiLogout color="black" size={20} />
                  <span className="menu-label-second">Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default Secondsidebaruser;