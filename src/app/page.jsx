'use client';
import React, { useState, useRef } from 'react';
import { BsArrowReturnRight } from 'react-icons/bs';
import Homeheader from '@/components/Masterheader';
import { FcGoogle } from 'react-icons/fc';
import Homemidsection from '@/components/homemidsection';
import Forgotpassword from '@/components/Forgotpassword';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useAppDispatch } from '@/Redux/store/store';
import Footer from '@/components/Footer';
import { useError } from '@/components/ErrorManager';


const page = () => {
  const { showError } = useError();


  const navLinks = [
    { name: "Home", href: "./" },
    { name: "About Us", href: "./user/aboutus" },
    { name: "Privacy Policy", href: "./user/privacypolicy" },
    { name: "Contact", href: "./user/contactus" }
  ];

  return (
    <>
    
      <div className="herosection">
        {/* nav bar start here */}
        <div className="herobox">
          <Homeheader rightElement={<Login />}  backgroundColor="rgba(250, 236, 236, 0.3)" navLinks={navLinks} />
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
        <div className="lgbtn2 " >
        <Login/>
        </div>  
      </div>
      <div>
        <Homemidsection />
      </div>
      <Footer />
     
    </>
  );
};

export const Login = () => {
  /* Logic for modal */
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const handleOpenModal1 = () => setShowModal1(true);
  const handleCloseModal1 = () => setShowModal1(false);

  const handleOpenModal2 = () => {
    setShowModal2(true);
    handleCloseModal1();
  };
  const handleCloseModal2 = () => setShowModal2(false);

  /* Logic for login validation */
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const router = useRouter(); // Use the new router from next/navigation
  const dispatch = useAppDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    const { loginUserService } = await import('../services/auth/login.service');
    const { datafetched } = await import('../Redux/auth/auth.reducer');
    const { decodeAccessToken } = await import('../utils/common.utils');
    const { ACCESS_TOKEN_LOC, REFRESH_TOKEN_LOC } = await import(
      '../Constants/common.constants'
    );

    const { setCookie } = await import('nookies');
    e.preventDefault();

    if (validateForm()) {
      console.log('Login successful:', formData);
      const { data, error } = await loginUserService(formData);
      if (data) {
        dispatch(
          datafetched(decodeAccessToken(data.access_token).decodedToken)
        );
        setCookie(null, ACCESS_TOKEN_LOC, data.access_token, { path: '/' });
        setCookie(null, REFRESH_TOKEN_LOC, data.refresh_token, { path: '/' });
        router.push('/user/genderchoose'); // Navigate to your desired route
      } else {
        const response = error;
        document.getElementById('response').innerText = response;
      }
    }
  };

  const sendotp = async (e) => {
    const BASEURL = process.env.NEXT_PUBLIC_BASE_URL || '';
    const forgotemail = document.getElementById('emailsend')?.value;

    try {
      const response = await axios.post(
        `${BASEURL}/auth/forgot-password`,
        { email: forgotemail },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('API Response:', response);
      console.log('API Response Message:', response.data.message);
    } catch (err) {
      console.log(
        'Error Response Message:',
        err.response?.data?.message || 'No error message provided.'
      );
    }
  };

  const showotpbox = () => {
    document.getElementById('forgotpassword').style.display = 'none';
    document.getElementById('optverify').style.display = 'block';
  };
  const resetpassword = () => {
    document.getElementById('resetpassword').style.display = 'block';
    document.getElementById('optverify').style.display = 'none';
  };

 

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      router.push('/user/genderchoose');
    }
  });

  const inputs = useRef([]);

  const handleKeyUp = (e, index) => {
    if (e.key >= '0' && e.key <= '9') {
      if (index < 3) {
        // Move focus to the next input, only up to the fourth input
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && !inputs.current[index].value) {
      inputs.current[index - 1].focus();
    }
  };
  return (
    <>
      <div className="lgbtn flex" onClick={handleOpenModal1}>
        <h3 className="mt-1 mx-3"> Get started</h3>
        <div className="lgicon">
          <BsArrowReturnRight color="white" size={20} />
        </div>
      </div>

      {/* First Modal */}
      {showModal1 && (
        <div className="modal">
          <div className="modal-content animate">
            <span className="close" onClick={handleCloseModal1}>
              &times;
            </span>
            <h1 className="text-center text-xl font-semibold mb-3 text-black">
              Log in
            </h1>
            <div
              className="flex glgbtn justify-center gap-2 items-center"
              onClick={() => login()}
            >
              <FcGoogle size={20} />
              <h1 className="text-black">Sign in with Google</h1>
            </div>

            <h4 className="hrline mx-3 my-3 text-gray-600"> or </h4>
            {/* login form start here */}
            <div onKeyUp={(e) => e.key === 'Enter' && handleSubmit(e)}>
              <p className="text-sm text-gray-800">Email</p>
              <input
                placeholder="Enter your email"
                className="inputfield text-black"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <br />
              {errors.email && (
                <span className="text-sm text-pink-700">{errors.email}</span>
              )}
              <p className="text-sm text-gray-800">Password</p>
              <input
                placeholder="*********"
                className="inputfield text-black"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <br />
              {errors.password && (
                <span className="text-sm text-pink-700">{errors.password}</span>
              )}
              <p id="response" className="text-sm text-pink-700"></p>
              <br />
              <span
                className="frpassword  text-pink-700"
                onClick={handleOpenModal2}
              >
                Forget password?
              </span>
              <br />

              <button
                type="submit"
                className="w-full loginbtn text-center"
                onClick={handleSubmit}
              >
                login
              </button>
              {/* login form end here */}
              <div className="flex mt-3 mb-1 justify-center ">
                <p className="text-xs text-black">Dont have an account ? </p>{' '}
                <Link href={'./user/signup'}>
                  
                  <p className="text-pink-600 text-xs">Sign up here</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Second Modal */}
      {showModal2 && (
        <div className="modal">
          <div className="modal-content p-3">
            <span className="close" onClick={handleCloseModal2}>
              &times;
            </span>
            <div id="forgotpassword">
              <h2 className="text-center text-xl my-3 font-bold text-black">
                Forgot password
              </h2>
              <p>Email</p>
              <p className="text-xs text-gray-700 mb-2">
                You will recieve code in your mail address
              </p>

              <input
                placeholder="Enter your email"
                className="inputfield "
                type="email"
                name="forgotpassword"
                id="emailsend"
              />

              <button
                className="w-full loginbtn text-center"
                onClick={showotpbox}
              >
                Proceed
              </button>
            </div>
            <div id="optverify" className="otpverifybox">
              <h1 className="text-center text-xl my-3 font-bold text-black">
                Verification
              </h1>
              <p className="text-black">Enter Verification Code</p>
              <div className="pin-inputs">
                <input
                  type="text"
                  className="pin-input"
                  maxLength="1"
                  ref={(el) => (inputs.current[0] = el)}
                  onKeyUp={(e) => handleKeyUp(e, 0)}
                  onKeyDown={(e) => handleKeyDown(e, 0)}
                />
                <input
                  type="text"
                  className="pin-input"
                  maxLength="1"
                  ref={(el) => (inputs.current[1] = el)}
                  onKeyUp={(e) => handleKeyUp(e, 1)}
                  onKeyDown={(e) => handleKeyDown(e, 1)}
                />
                <input
                  type="text"
                  className="pin-input"
                  maxLength="1"
                  ref={(el) => (inputs.current[2] = el)}
                  onKeyUp={(e) => handleKeyUp(e, 2)}
                  onKeyDown={(e) => handleKeyDown(e, 2)}
                />
                <input
                  type="text"
                  className="pin-input"
                  maxLength="1"
                  ref={(el) => (inputs.current[3] = el)}
                  onKeyUp={(e) => handleKeyUp(e, 3)}
                  onKeyDown={(e) => handleKeyDown(e, 3)}
                />
              </div>
              <div className="text-sm text-gray-700 flex justify-center my-2">
                <span>If you dont' receive code </span>
                <span className="text-pink-600">Resend Code</span>
              </div>
              <button
                className="w-full loginbtn text-center"
                onClick={resetpassword}
              >
                Proceed
              </button>
            </div>
            <div className="resetpassword" id="resetpassword">
              <Forgotpassword />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
