'use client';
import { useState } from 'react';
import Link from 'next/link';
import Notify from './Notify';
import { BsArrowReturnRight } from 'react-icons/bs';
import { FillOtpModel, ForgotPasswordModel, LoginModel } from './Models';
import Headerprofilebutton from './headerprofilebutton';

const Masterheader = ({
  isLogin,
  backgroundColor = 'white',
  navLinks = []
}) => {
  const [modelDetails, setModelDetails] = useState({
    type: null,
    open: false,
    data: null
  });
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
            <div className="logo ">zestful amigos</div>
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
                <div>
                  <Headerprofilebutton />
                </div>
              </div>
            )}
          </div>
          {modelDetails.open && getModel(modelDetails.type)}
        </header>
      </div>
    </div>
  );
};

export default Masterheader;
