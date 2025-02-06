import React from 'react';
import dynamic from 'next/dynamic';
// import Homeheader from '@/components/Masterheader';
// import Homemidsection from '@/components/homemidsection';
// import Footer from '@/components/Footer';
// import Login from '@/components/Login';

const Homeheader = dynamic(() => import('@/components/Masterheader'));
const Homemidsection = dynamic(() => import('@/components/homemidsection'));
const Footer = dynamic(() => import('@/components/Footer'));
const Login = dynamic(() => import('@/components/Login'));

const page = () => {
  const navLinks = [
    { name: 'Home', href: './' },
    { name: 'About Us', href: './user/aboutus' },
    { name: 'Privacy Policy', href: './user/privacypolicy' },
    { name: 'Contact', href: './user/contactus' }
  ];

  return (
    <>
      <div className="herosection">
        {/* nav bar start here */}
        <div className="herobox">
          <Homeheader
            isLogin
            backgroundColor="rgba(250, 236, 236, 0.3)"
            navLinks={navLinks}
          />
        </div>
        {/* hero section */}
        <div className="herocont">
          <h1 className="companionconnect text-white ">Connect,Engage,Enjoy</h1>
          <h2 className="text-3xl text-white mt-4">
            <span className="companionwith"> with</span>
            <span className="ml-6 zestful ">zestful amigos</span>
          </h2>
          <p className="text-gray-800 mt-4  font-bold text-lg companionawait">
            Your ZestfulCompanion Awaits......
          </p>
        </div>
        <div className="lgbtn2 ">
          <Login />
        </div>
      </div>
      <div>
        <Homemidsection />
      </div>
      <Footer />
    </>
  );
};

export default page;
