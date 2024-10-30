"use client";
import React, { useState } from 'react';
import { BsArrowReturnRight } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";

const page =() => {

  /* Logic for nav bar */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Login successful:', formData);
      // Login logic goes here
    }
  };

  return (
    <>
      <div className="herosection">
      {/* nav bar start here */}
        <div className="herobox">
          <header className="header ">
            <div className="menu-toggle" onClick={toggleMenu}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
            <div className="logo ">zestful amigos</div>

            <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
              <ul className="nav-list">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
                <li>
                  <a href="#">Contact</a>
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
          <h1 className="text-5xl text-white ">Connect,Engage,Enjoy</h1>
          <h2 className="text-3xl text-white mt-4">
            with <span className="ml-6 zestful ">zestful amigos</span>
          </h2>
          <p className="text-gray-800 mt-4  font-bold text-lg">
            Your ZestfulCompanion Awaits......
          </p>
        </div>
      </div>
      {/* how does work section */}
      <div>
        <h1>how does it work</h1>
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A
              temporibus quo mollitia optio error exercitationem, eius qui id.
              Fugit, distinctio?
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
            <div className="flex glgbtn justify-center gap-2 items-center">
              <FcGoogle size={20} />
              <h1>Sign in with google</h1>
            </div>

            <h4 className="hrline mx-3 my-3 text-gray-600">{" "}or {" "}</h4>
            {/* login form start here */}
            <div>
              <form onSubmit={handleSubmit}>
              <p className="text-sm text-gray-800">Email</p>
              <input  placeholder="Enter your email" className="inputfield "
               type="email"
               name="email"
               value={formData.email}
               onChange={handleInputChange}
              />
              <br />
              {errors.email && <span className="text-sm text-pink-700">{errors.email}</span>}
              <p className="text-sm text-gray-800">Password</p>
              <input  placeholder="*********" className="inputfield"
               type="password"
               name="password"
               value={formData.password}
               onChange={handleInputChange}
              />
               <br />
               {errors.password && <span className="text-sm text-pink-700">{errors.password}</span>}
              <br />
              <span className="frpassword  text-pink-700" onClick={handleOpenModal2}>
                Forget password?
              </span>
              <br />
              
              <button type="submit" className="w-full loginbtn text-center">login</button>
              
              </form>
              {/* login form end here */}
              <div className="flex mt-3 mb-1 justify-center ">
                <p className="text-xs">Dont have an account? </p>{" "}
                <p className="text-pink-600 text-xs">Signup here</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Second Modal */}
      {showModal2 && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal2}>
              &times;
            </span>
            <h2>Second Modal</h2>
            <button >Open Third Modal</button>
          </div>
        </div>
      )}

    

      
     
    </>
  );
}

export default page;
