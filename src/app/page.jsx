'use client';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

const Homeheader = dynamic(() => import('@/components/Masterheader'));
const Homemidsection = dynamic(() => import('@/components/homemidsection'));
const Footer = dynamic(() => import('@/components/Footer'));
const Login = dynamic(() => import('@/components/Login'));

const page = () => {
  useEffect(() => {
    import('nookies').then(async ({ parseCookies }) => {
      const { ACCESS_TOKEN_LOC } = await import('@/Constants/common.constants');
      const { decodeAccessToken } = await import('@/utils/common.utils');
      const cookies = parseCookies();
      const token = cookies[ACCESS_TOKEN_LOC];
      if (token) {
        const user = decodeAccessToken(token).decodedToken;
        if (user && user.isCompanion) {
          redirect('/companion/dashboard');
        } else if (user && !user.isCompanion) {
          redirect('/user/chat');
        }
      }
    });
  }, []);

  return (
    <>
      <div className="herosection">
        {/* nav bar start here */}
        <div className="herobox">
          <Homeheader isLogin backgroundColor="rgba(250, 236, 236, 0.3)" />
        </div>
        {/* hero section */}
        <div className="herocont">
          <h1 className="companionconnect text-white ">Connect,Engage,Enjoy</h1>
          <h2 className="text-3xl text-white mt-4">
            <span className="companionwith"> with</span>
            <span className="ml-6 zestful ">zestful amigos</span>
          </h2>
         
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
