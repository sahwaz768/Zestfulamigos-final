'use client';
import React, { useState, useEffect } from 'react';
import { BsArrowReturnRight } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import { CiMail } from 'react-icons/ci';
import { CiPhone } from 'react-icons/ci';
import { FaWhatsapp } from 'react-icons/fa';
import { FiFacebook } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { CiLinkedin } from 'react-icons/ci';
import { FcGoogle } from 'react-icons/fc';
import Homemidsection from '@/components/homemidsection';
import Forgotpassword from '@/components/Forgotpassword';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const page = () => {
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
    const { default:{ set } } = await import("js-cookie")
    e.preventDefault();
    if (validateForm()) {
      console.log('Login successful:', formData);
      const { data, error } = await loginUserService(formData);
      if (data) {
        set("x-token", data.access_token);
        router.push('/user/genderchoose'); // Navigate to your desired route
      }
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

  const hideinvalide = () => {
    document.getElementById('invalide-email').style.display = 'none';
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      router.push('/user/genderchoose'); 
    }
  });

  return (
    <>
      <div className="flex justify-center">
        <div className="invalide-email " id="invalide-email">
          <h1 className="text-sm font-bold"> Invalide email or password </h1>
          <span className="close ml-2" onClick={hideinvalide}>
            &times;
          </span>
        </div>
      </div>
      <div className="herosection">
        {/* nav bar start here */}
        <div className="herobox">
          <header className="header ">
            <div className="logo ">zestful amigos</div>

            <nav>
              <ul className="nav-list">
                <li>
                  <Link href={'/'}>
                    {' '}
                    <p>Home</p>{' '}
                  </Link>
                </li>
                <li>
                  <Link href={'./user/aboutus'}>
                    {' '}
                    <p>About</p>
                  </Link>
                </li>
                <li>
                  <Link href={'./user/privacypolicy'}>
                    {' '}
                    <p>privacy policy</p>{' '}
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="lgbtn flex" onClick={handleOpenModal1}>
              <h3 className="mt-1 mx-3"> Get started</h3>
              <div className="lgicon">
                <BsArrowReturnRight color="white" size={20} />
              </div>
            </div>
          </header>
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
        <div className="lgbtn2 " onClick={handleOpenModal1}>
          <h3 className="mt-1 mx-3"> Get started</h3>
          <div className="lgicon2">
            <BsArrowReturnRight color="white" size={20} />
          </div>
        </div>
      </div>
      {/* how does work section */}
      <div>
        <Homemidsection />
      </div>
      {/* footer section */}
      <div className="footer text-white">
        <div className="  py-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 ">
            <div>
              <h2 className="footerzest">zestful amigos</h2>
              <p className="text-white">Connect,Engage,Enjoy</p>
            </div>

            <div>
              <div className="flex mt-6">
                <CiLocationOn color="white" size={20} />
                <h1 className="ml-3 text-white">Mumbai, India</h1>
              </div>
              <div className="flex mt-4">
                <CiMail color="white" size={20} className="" />
                <h1 className="ml-3 text-white">Zestfulamigos@gmail.com</h1>
              </div>
              <div className="flex mt-4">
                <CiPhone color="white" size={20} />
                <h1 className="ml-3 text-white">+91 9632587144</h1>
              </div>
              <div></div>
            </div>
            <div className="mt-4 ">
              <p className="mt-1">Home</p>
              <p className="mt-1">AboutUs</p>
              <p className="mt-1">Privacy Policy</p>
            </div>

            <div className="mt-4">
              <Link href={'/user/becompanion'}>
                {' '}
                <h1>Be a companion</h1>
              </Link>
              <Link href={'/user/concern'}>
                {' '}
                <h1 className="mt-2">Raise a concern</h1>
              </Link>
            </div>
          </div>
        </div>
        <hr className="mx-16" />
        <div className="flex justify-center items-center mt-8 gap-6">
          <FaWhatsapp color="white" size={26} />
          <FiFacebook color="white" size={26} />
          <FaInstagram color="white" size={26} />
          <FaXTwitter color="white" size={26} />
          <CiLinkedin color="white" size={26} />
        </div>
        <div className="pt-14 py-7 text-center">
          Copyright 2024.All right reserve
        </div>
      </div>

      {/* First Modal */}
      {showModal1 && (
        <div className="modal">
          <div className="modal-content animate">
            <span className="close" onClick={handleCloseModal1}>
              &times;
            </span>
            <h1 className="text-center text-xl font-semibold mb-3">Log in</h1>
            <div
              className="flex glgbtn justify-center gap-2 items-center"
              onClick={() => login()}
            >
              <FcGoogle size={20} />
              <h1>Sign in with google</h1>
            </div>

            <h4 className="hrline mx-3 my-3 text-gray-600"> or </h4>
            {/* login form start here */}
            <div>
              <p className="text-sm text-gray-800">Email</p>
              <input
                placeholder="Enter your email"
                className="inputfield "
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
                className="inputfield"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <br />
              {errors.password && (
                <span className="text-sm text-pink-700">{errors.password}</span>
              )}
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
                <p className="text-xs">Dont have an account? </p>{' '}
                <Link href={'./user/signup'}>
                  {' '}
                  <p className="text-pink-600 text-xs">Signup here</p>
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
              <h2 className="text-center text-xl my-3 font-bold">
                Forgot password!
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
              />

              <button
                className="w-full loginbtn text-center"
                onClick={showotpbox}
              >
                Proceed
              </button>
            </div>
            <div id="optverify" className="otpverifybox">
              <h1 className="text-center text-xl my-3 font-bold">
                Verification
              </h1>
              <p className="text-black">Enter Verification code</p>
              <div className="pin-inputs">
                <input
                  type="text"
                  className="pin-input"
                  maxlength="1"
                  oninput="if(this.value.length > 1) this.value=this.value.slice(0,1)"
                />
                <input
                  type="text"
                  className="pin-input"
                  maxlength="1"
                  oninput="if(this.value.length > 1) this.value=this.value.slice(0,1)"
                />
                <input
                  type="text"
                  className="pin-input"
                  maxlength="1"
                  oninput="if(this.value.length > 1) this.value=this.value.slice(0,1)"
                />
                <input
                  type="text"
                  className="pin-input"
                  maxlength="1"
                  oninput="if(this.value.length > 1) this.value=this.value.slice(0,1)"
                />
              </div>
              <div className="text-sm text-gray-700 flex justify-center my-2">
                <span>If you dont' receive code click </span>
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
