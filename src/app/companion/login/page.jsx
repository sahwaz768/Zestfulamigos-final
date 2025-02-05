'use client';
import React, { useState } from 'react';
import Forgotpassword from '@/components/Forgotpassword';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import Companion from 'src/app/complogin.png';
import Image from 'next/image';

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
  const router = useRouter();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Login successful:', formData);
      // Login logic goes here
      router.push('./dashboard');
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
    onSuccess: (tokenResponse) => console.log(tokenResponse)
  });

  return (
    <>
      <div className="companion-login-box flex">
        <div className="comp-lg-box">
          <h1 className="zestful-companion">zestful amigos</h1>
          <h1 className="text-3xl ">You want to work as our "Amigos"</h1>
          <button className="companion-login-btn" onClick={handleOpenModal1}>
            Start here
          </button>
        </div>
        <div className="comp-lg-image">
          <Image src={Companion} />
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

            {/* login form start here */}
            <div>
              <form onSubmit={handleSubmit}>
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
                  <span className="text-sm text-pink-700">
                    {errors.password}
                  </span>
                )}
                <br />
                <span
                  className="frpassword  text-pink-700"
                  onClick={handleOpenModal2}
                >
                  Forget password?
                </span>
                <br />

                <button type="submit" className="w-full loginbtn text-center">
                  login
                </button>
              </form>
              {/* login form end here */}
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
