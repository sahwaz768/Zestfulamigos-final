'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Notify from './Notify';
import { BsArrowReturnRight } from 'react-icons/bs';
import {
  Emailverification,
  FillOtpModel,
  ForgotPasswordModel,
  LoginModel
} from './Models';
import Headerprofilebutton from './headerprofilebutton';
import { CgProfile } from 'react-icons/cg';
import Image from 'next/image';
import Logo from '@/shared/Assets/ZAlogo.png';

const Masterheader = ({
  isLogin,
  backgroundColor = 'white',
  fillBlank = false,
  navLinks = []
}) => {
  const dropdownRef = useRef(null);
  const [modelDetails, setModelDetails] = useState({
    type: null,
    open: false,
    data: null
  });
  const [profileDetails, setProfileDetails] = useState(false);
  const newnavLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/aboutus' },
    { name: 'Privacy Policy', href: '/privacypolicy' },
    { name: 'Contact', href: '/contactus' }
  ];
  const handleModel = ({ type = null, open, data }) => {
    if (typeof open === 'boolean') {
      if (!open) {
        setModelDetails({ type, open, data: null });
      } else {
        setModelDetails({ type, open, data });
      }
    } else {
      setModelDetails((prev) => ({ ...prev, type }));
    }
  };

  const getModel = (type) => {
    switch (type) {
      case 'login':
        return <LoginModel handleModel={handleModel} />;

      case 'emailverify':
        return (
          <Emailverification
            data={modelDetails.data}
            handleModel={handleModel}
          />
        );

      case 'forgotpassword':
        return <ForgotPasswordModel handleModel={handleModel} />;

      case 'fillotp':
        return (
          <FillOtpModel handleModel={handleModel} data={modelDetails.data} />
        );

      default:
        return null;
    }
  };
  return (
    <div>
      <div className="swipeheader">
        <header className="header" style={{ backgroundColor }}>
          <Link href={'/'}>
            <div className="logo ">
              {' '}
              <Image src={Logo} alt="logo" />
            </div>
          </Link>
          <nav className="nav">
            <ul className="nav-list text-black text-sm">
              {newnavLinks.map((link, index) => (
                <Link key={index} href={link.href} passHref>
                  <p className="mx-3">{link.name}</p>
                </Link>
              ))}
            </ul>
          </nav>
          {fillBlank ? null : (
            <div className="nav-right">
              {isLogin ? (
                <div
                  className="lgbtn flex"
                  onClick={() => handleModel({ type: 'login', open: true })}
                >
                  <h3 className="mt-1 mx-3"> Get started</h3>
                  <div className="lgicon">
                    <BsArrowReturnRight color="white" size={20} />
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 mr-4">
                  <Notify backgroundColor="black" color="white" />
                  <div className="relative" ref={dropdownRef}>
                    <div
                      onClick={() => setProfileDetails(!profileDetails)}
                      className="bellicon"
                    >
                      <CgProfile size={20} color="white" />
                    </div>
                    {profileDetails ? (
                      <Headerprofilebutton
                        handleClose={() => setProfileDetails(false)}
                        dropdownRef={dropdownRef}
                      />
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          )}
          {modelDetails.open && getModel(modelDetails.type)}
        </header>
      </div>
    </div>
  );
};

export default Masterheader;
