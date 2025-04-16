'use client';
import React, { useState, useRef } from 'react';
import { BsArrowReturnRight } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import Forgotpassword from '@/components/Forgotpassword';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch } from '@/Redux/store/store';
import {
  Emailverification,
  FillOtpModel,
  ForgotPasswordModel,
  LoginModel,
} from './Models';

const Login = () => {

    const dropdownRef = useRef(null);
    const [modelDetails, setModelDetails] = useState({
      type: null,
      open: false,
      data: null
    });

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
    <>
      <div className="lgbtn flex"onClick={() => handleModel({ type: 'login', open: true })}>
        <h3 className="mt-1 mx-3"> Get started</h3>
        <div className="lgicon">
          <BsArrowReturnRight color="white" size={20} />
        </div>
      </div>

    


      {modelDetails.open && getModel(modelDetails.type)}
    </>
  );
};

export default Login;
