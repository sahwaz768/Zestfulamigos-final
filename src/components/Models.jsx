'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import {
  getAddressFromLatLng,
  getLocationfrominput,
  loadGoogleMapsScript
} from '@/utils/location';
import { decodeLoginCredentials } from '@/utils/auth.utils';
import { GoLocation } from 'react-icons/go';
import { AiOutlineSafety } from 'react-icons/ai';
import { CiLocationOff } from 'react-icons/ci';
import { BiLocationPlus } from 'react-icons/bi';
import { IoIosTimer } from 'react-icons/io';
import { IoCloudUploadOutline } from "react-icons/io5";


export const StartSessionModel = ({ closeModal, bookingid }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError('');

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    if (otp.includes('')) {
      setError('Please fill in all the fields');
    } else {
      const otpValue = otp.join('');
      try {
        setIsLoading(() => true);
        const { startSession } = await import(
          '../services/sessions/usersessions.service'
        );
        const values = {
          bookingid: bookingid?.id,
          otp: Number(otpValue)
        };
        const { data } = await startSession(values);
        if (data) {
          const { getActiveChatsService } = await import(
            '@/services/user/chats.service'
          );
          const { data: chatdata } = await getActiveChatsService();
          const { appDispatch } = await import('@/Redux/store/store');
          const { datafetched } = await import(
            '@/Redux/chatroomReducer/chatroomReducer'
          );
          if (chatdata) {
            const values = chatdata.map((l) => ({
              user: l.User.filter((p) => !p.isCompanion)[0],
              companion: l.User.filter((p) => p.isCompanion)[0],
              id: l.id,
              booking: l.Bookings,
              session: l.Bookings?.Sessions
            }));
            appDispatch(datafetched({ chats: values, isEmailVerified: true }));
          } else if (error === 'Email not verified') {
            appDispatch(datafetched({ chats: [], isEmailVerified: false }));
          }
          closeModal();
        } else {
          setError('Sorry Wrong OTP! Please try Again');
        }
      } catch (error) {
      } finally {
        setIsLoading(() => false);
      }
    }
  };

  return (
    <div className="extension-modal-overlay">
      <div className="extension-modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h1 className="text-2xl text-center mt-2 font-bold">
          OTP Verification
        </h1>
        <h1 className="text-center text-xs">Drop Your Companion OTP</h1>
        <div className="pin-inputs mt-4">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              className="pin-input"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
            />
          ))}
        </div>
        <button
          className="companion-cancel-btn mt-2"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Please wait..' : 'Sumit OTP'}
        </button>
        {error && <p className="text-xs">{error}</p>}
      </div>
    </div>
  );
};

export const EndSessionModel = ({ closeModal, session }) => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleEndSession = async () => {
    try {
      setisLoading(() => true);
      const { endSession } = await import(
        '../services/sessions/usersessions.service'
      );
      const values = {
        sessionid: session?.id
      };
      const { data } = await endSession(values);
      if (data) {
        const { getActiveChatsService } = await import(
          '@/services/user/chats.service'
        );
        const { data: chatdata } = await getActiveChatsService();
        const { appDispatch } = await import('@/Redux/store/store');
        const { datafetched } = await import(
          '@/Redux/chatroomReducer/chatroomReducer'
        );
        if (chatdata) {
          const values = chatdata.map((l) => ({
            user: l.User.filter((p) => !p.isCompanion)[0],
            companion: l.User.filter((p) => p.isCompanion)[0],
            id: l.id,
            booking: l.Bookings,
            session: l.Bookings?.Sessions
          }));
          appDispatch(datafetched({ chats: values, isEmailVerified: true }));
        } else if (error === 'Email not verified') {
          appDispatch(datafetched({ chats: [], isEmailVerified: false }));
        }
        closeModal();
      } else {
        setError('Some Error Occured Please try Again');
      }
    } catch (error) {
    } finally {
      setisLoading(() => false);
    }
  };
  return (
    <div className="extension-modal-overlay">
      <div className="extension-modal-content">
        <div className="">
          <h1 className="text-center text-2xl font-bold">Are you sure</h1>
          <div className="flex justify-center gap-2 mr-3 my-3">
            <button
              className="yes"
              onClick={handleEndSession}
              disabled={isLoading}
            >
              {isLoading ? 'Ending Session..' : 'Yes'}
            </button>
            <button className="no" onClick={closeModal} disabled={isLoading}>
              No
            </button>
            {error && <p className="text-sm text-gray-600">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ExtensionModel = ({ closeModal, bookingid }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setError(''); // Clear the error if a slot is selected
  };

  const handleSubmit = async () => {
    if (!selectedSlot) {
      setError('Please select a slot before submitting.');
      return;
    }
    try {
      setisLoading(() => true);
      const { startextendCurrentSession } = await import(
        '../services/sessions/usersessions.service'
      );
      const { toast } = await import('@/utils/reduxtrigger.utils')
      const values = {
        bookingid: bookingid?.id,
        extentedhours: selectedSlot
      };
      const { data, error } = await startextendCurrentSession(values);
      if (data) {
        router.push(`./extendsession?bookingId=${values.bookingid}`);
        closeModal();
      } else {
        toast.error(error)
        closeModal();
      }
    } catch (error) {
    } finally {
      setisLoading(() => false);
    }
  };
  const Slots = Array.from({ length: 3 }, (_, i) => i + 1);

  return (
    <div className="extension-modal-overlay">
      <div className="extension-modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>

        <h1 className="text-lg text-center my-2">Extent your duration</h1>
        <div className="slot-extension-btn">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {Slots.map((l) => (
              <button
                key={l}
                className={`extent-slot-button ${selectedSlot === l ? 'selected' : ''}`}
                onClick={() => handleSlotClick(l)}
              >
                {l} HOUR
              </button>
            ))}
          </div>
          <br />

          {error && <p className="text-sm text-gray-600">{error}</p>}
          <button
            className="extention-submit-button"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Requesting...' : 'Request access'}
          </button>
        </div>
      </div>
    </div>
  );
};

export const RaiseaIssueModel = ({ closeModal, userDetails }) => {
  const [isLoading, setisLoading] = useState(false);
  const [formData, setFormData] = useState({
    // email: '',
    subject: '',
    explanation: '',
    image: null
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!formData.subject) {
      formErrors.subject = 'Problem description is required.';
    }

    if (!formData.explanation) {
      formErrors.explanation = 'Please elaborate on your problem.';
    }

    return formErrors;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      setisLoading(() => true);
      const userData = new FormData();
      userData.append('subject', formData.subject);
      userData.append('explanation', formData.explanation);
      if (formData.image) userData.append('images', formData.image);
      userData.append('userid', userDetails.userId);
      const { createNewIssue } = await import(
        '@/services/issues/userissues.service'
      );
      const { data } = await createNewIssue(userData);
      if (data) {
        closeModal();
      }
      setisLoading(() => false);
      // Perform further actions like sending data to the server here
    }
  };

  return (
    <div className="ticket-modal-overlay">
      <div
        className="ticket-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-bold">Raise your issue</h2>

        <button onClick={closeModal} className="close">
          &times;
        </button>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label htmlFor="problem" className="text-sm">
              Problem related
            </label>
            <textarea
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="inputfield-glg"
              placeholder="payment issue"
            />
            {errors.subject && <p className="text-xs">{errors.subject}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="elaborateProblem" className="text-sm">
              Elaborate Your Problem:
            </label>
            <textarea
              id="explanation"
              name="explanation"
              value={formData.explanation}
              onChange={handleChange}
              className="inputfield-glg"
              placeholder="Hii sir i have payment issue will booking"
            />
            {errors.explanation && (
              <p className="text-xs">{errors.explanation}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="image" className="text-sm">
              Attachment (optional):
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="my-3"
            />
          </div>
          <div className="mt-2">
            <button type="submit" className="sbtbtm" disabled={isLoading}>
              {isLoading ? 'Submitting' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const ForgotPasswordModel = ({ handleModel }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const handleForgorPassword = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setisLoading(() => true);
    const { forgotEmail } = await import(
      '../services/auth/forgotpassword.service'
    );
    const { data } = await forgotEmail({ email });
    if (data) {
      handleModel({ type: 'fillotp', open: true, data: { email } });
    } else {
      console.log('Error Occured');
    }
    setisLoading(() => false);
  };
  return (
    <div className="modal">
      <div className="modal-content p-3">
        <span className="close" onClick={() => handleModel({ open: false })}>
          &times;
        </span>
        <div id="forgotpassword">
          <h2 className="text-center text-xl my-3 font-bold text-black">
            Forgot password
          </h2>
          <p className='text-black'>Email</p>
          <p className="text-xs text-gray-700 mb-2">
            You will recieve code in your mail address
          </p>

          <input
            placeholder="Enter your email"
            className="inputfield"
            type="email"
            name="forgotpassword"
            id="emailsend"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) {
                setError('');
              }
            }}
          />
          {error && <p className="text-xs text-pink-600">{error}</p>}
          <br />
          <button
            className="w-full loginbtn text-center"
            onClick={handleForgorPassword}
            disabled={isLoading}
          >
            {isLoading ? 'Sending Email' : 'Proceed'}
          </button>
        </div>
      </div>
    </div>
  );
};

export const FillOtpModel = ({ handleModel, data: modeldata }) => {
  const [resendPassword, setResendPassword] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [password, setpassword] = useState({
    password: '',
    confirmpassword: ''
  });
  const inputs = useRef([]);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!resendPassword) {
      setTimeout(() => {
        setResendPassword(() => true);
      }, 1000);
    }
  }, [resendPassword]);

  const handleKeyUp = (e, index) => {
    if (e.key >= '0' && e.key <= '9') {
      if (index < 3) {
        // Move focus to the next input, only up to the fourth input
        inputs.current[index + 1].focus();
      }
      if (error) {
        setError('');
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && !inputs.current[index].value) {
      inputs.current[index - 1].focus();
    }
    if (error) {
      setError('');
    }
  };
  const handleForgorPassword = async () => {
    const { forgotEmail } = await import(
      '../services/auth/forgotpassword.service'
    );
    const { data } = await forgotEmail({ email: modeldata.email });
    if (data) {
      handleModel({ type: 'fillotp', open: true });
    } else {
      console.log('Error Occured');
    }
  };

  const handleResetPassword = async () => {
    const otp = inputs.current?.map((l) => l.value).join('');
    if (!otp || otp.length < 4) {
      setError('Please fill OTP');
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(
        password.password
      )
    ) {
      setError('Please Enter Valid Password');
    } else if (password.password !== password.confirmpassword) {
      setError('Password Mismatch!');
    } else {
      try {
        setisLoading(() => true);
        const { resetPassword } = await import(
          '@/services/auth/forgotpassword.service'
        );
        const { toast } = await import('@/utils/reduxtrigger.utils');
        const values = {
          OTP: otp,
          email: modeldata.email,
          password: password.password
        };
        const { data } = await resetPassword(values);
        if (data) {
          handleModel({ open: false });
          toast.success('Successfully Password changed');
        } else {
          toast.error('Invalid Credentials');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setisLoading(() => false);
      }
    }
  };

  const handleInputChange = (ref) => {
    const value = ref.value;
    const numericValue = value.replace(/[^0-9]/g, '');
    ref.value = numericValue;
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setpassword((l) => ({ ...l, [name]: value }));
    if (error) {
      setError('');
    }
  };
  return (
    <div className="modal">
      <div className="modal-content p-3">
        <span className="close" onClick={() => handleModel({ open: false })}>
          &times;
        </span>
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
            onInput={() => handleInputChange(inputs.current[0])}
            onKeyUp={(e) => handleKeyUp(e, 0)}
            onKeyDown={(e) => handleKeyDown(e, 0)}
          />
          <input
            type="text"
            className="pin-input"
            maxLength="1"
            ref={(el) => (inputs.current[1] = el)}
            onInput={() => handleInputChange(inputs.current[1])}
            onKeyUp={(e) => handleKeyUp(e, 1)}
            onKeyDown={(e) => handleKeyDown(e, 1)}
          />
          <input
            type="text"
            className="pin-input"
            maxLength="1"
            onInput={() => handleInputChange(inputs.current[2])}
            ref={(el) => (inputs.current[2] = el)}
            onKeyUp={(e) => handleKeyUp(e, 2)}
            onKeyDown={(e) => handleKeyDown(e, 2)}
          />
          <input
            type="text"
            className="pin-input"
            maxLength="1"
            onInput={() => handleInputChange(inputs.current[3])}
            ref={(el) => (inputs.current[3] = el)}
            onKeyUp={(e) => handleKeyUp(e, 3)}
            onKeyDown={(e) => handleKeyDown(e, 3)}
          />
        </div>
        {resendPassword && (
          <div className="text-sm text-gray-700 flex justify-center my-2">
            <span>If you dont' receive code </span>
            <span
              className="text-pink-600 cursor-pointer"
              onClick={handleForgorPassword}
            >
              Resend Code
            </span>
          </div>
        )}
        <p className="text-black mt-3 text-sm">Enter new password</p>
        <input
          type={'password'}
          value={password.password}
          name="password"
          onChange={handlePasswordChange}
          placeholder="*********"
          className="inputfield"
        />
        <p className="text-black mt-3 text-sm">Confirm password</p>
        <input
          type={'password'}
          value={password.confirmpassword}
          name="confirmpassword"
          onChange={handlePasswordChange}
          placeholder="*********"
          className="inputfield"
        />
        <button
          className="w-full loginbtn text-center"
          onClick={handleResetPassword}
          disabled={isLoading}
        >
          {isLoading ? 'Requesting...' : 'Proceed'}
        </button>
        {error && <p className="text-pink-600">{error}</p>}
      </div>
    </div>
  );
};

export const LoginModel = ({ handleModel }) => {
  const [isLoading, setisLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (Object.keys(errors).length) {
      setErrors({});
    }
  };

  const handleSubmit = async (e) => {
    const { loginUserService } = await import('../services/auth/login.service');
    e.preventDefault();
    if (validateForm()) {
      setisLoading(() => true);
      try {
        const { data, error } = await loginUserService(formData);
        if (data) {
          const decodedToken = await decodeLoginCredentials(data);
          if (decodedToken.isEmailVerified) {
            if (decodedToken.isCompanion) {
              router.push('/companion/dashboard');
            } else {
              router.push('/user/chat');
            }
          } else {
            handleModel({
              open: true,
              type: 'emailverify',
              data: {
                email: formData.email,
                redirecturl: decodedToken.isCompanion
                  ? '/companion/dashboard'
                  : '/user/chat'
              }
            });
          }
        } else {
          setErrors({ password: error });
        }
      } catch (error) {
        setErrors({ password: 'Server Error!' });
      } finally {
        setisLoading(() => false);
      }
    }
  };
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { googleloginUserService } = await import(
        '@/services/auth/login.service'
      );
      const { toast } = await import('@/utils/reduxtrigger.utils');
      const values = {
        token: tokenResponse.code
      };
      const { data, error } = await googleloginUserService(values);
      if (data) {
        const decodedToken = await decodeLoginCredentials(data);
        if (decodedToken.isCompanion) {
          router.push('/companion/dashboard');
          setisLoading(() => false);
        } else {
          router.push('/user/chat');
          setisLoading(() => false);
        }
      } else {
        toast.error(error);
      }
    },
    flow: 'auth-code'
  });

  return (
    <div className="modal">
      <div className="modal-content animate">
        <span className="close" onClick={() => handleModel({ open: false })}>
          &times;
        </span>
        <h1 className="text-center text-xl font-semibold mb-3 text-black">
          Log in
        </h1>
        <div
          className="flex glgbtn justify-center gap-2 items-center cursor-pointer"
          onClick={() => login()}
        >
          <FcGoogle size={20} />
          <h1 className="text-black">Sign in with Google</h1>
        </div>

        <h4 className="hrline mx-3 my-3 text-gray-600"> or </h4>
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
            className="frpassword  text-pink-700 cursor-pointer"
            onClick={() => handleModel({ type: 'forgotpassword', open: true })}
          >
            Forget password?
          </span>
          <br />

          <button
            type="submit"
            className="w-full loginbtn text-center"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Please Wait..' : 'Login'}
          </button>

          <div className="flex mt-3 mb-1 justify-center ">
            <p className="text-xs text-black">Dont have an account ? </p>{' '}
            <Link href={'./signup'}>
              <p className="text-pink-600 text-xs">Sign up here</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CancelBookingModel = ({ closeModal, bookingDetail }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() === '') {
      setError('please specify the reason');
      return;
    }
    const bookingDetails = {
      bookingid: bookingDetail.id,
      reason: text
    };
    try {
      setisLoading(() => true);
      const { cancelBooking } = await import(
        '../services/user/bookings.service'
      );
      const { toast } = await import('@/utils/reduxtrigger.utils');
      const { data } = await cancelBooking(bookingDetails);
      if (data) {
        toast.success('Booking Under consideration will update you soon!');
        closeModal('Cancelled');
      } else {
        toast.error('Error Occured');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setError('');
      console.log('Submitted text:', text);
      setText('');
      setisLoading(() => false);
    }
  };
  return (
    <div className="companion-modal-overlay">
      <div
        className="companion-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <p onClick={() => closeModal()} className="close">
          &times;
        </p>
        <h1 className="text-center font-bold">Please specify the reason</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              id="textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Reason...."
              className="companion-textarea"
            ></textarea>
          </div>
          {error && <div className="text-xs">{error}</div>}
          <button
            type="submit"
            className="companion-cancel-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export const LocationaccessModel = ({ setLocation, closeModal }) => {
  const inputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLocationSuccess = async (position) => {
    try {
      const { latitude, longitude } = position.coords;
      const { lat, lng, formataddress, city, state } =
        await getAddressFromLatLng(latitude, longitude);
      setLocation && setLocation({ lat, lng, formataddress, city, state });
      window.localStorage.setItem(
        'userlocation',
        JSON.stringify({ lat, lng, formataddress, city, state })
      );
      const { userAgentService } = await import(
        '@/services/user/companionfind.service'
      );
      await userAgentService({ lat, lng, city, state });
      closeModal();
    } catch (error) {
      console.log('error in location');
    }
  };

  const handleLocationError = (error) => {
    console.log('Geolocation Error:', error);
    setErrorMessage('Geolocation failed. Please enter your location manually.');
  };

  const handleManualLocationSubmit = async () => {
    const manualLocation = inputRef.current.value;
    try {
      const { lat, lng, formataddress, city, state } =
        await getLocationfrominput(manualLocation);
      setLocation && setLocation({ lat, lng, formataddress, city, state });
      window.localStorage.setItem(
        'userlocation',
        JSON.stringify({ lat, lng, formataddress, city, state })
      );
      const { userAgentService } = await import(
        '@/services/user/companionfind.service'
      );
      await userAgentService({ lat, lng, city, state });
      closeModal();
    } catch (error) {
      setErrorMessage('Error fetching the location.');
    }
  };

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleLocationSuccess,
        handleLocationError
      );
    } else {
      console.log('Geolocation Not Supported'); // Debug unsupported
      setErrorMessage('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => {
        if (window.google && inputRef.current) {
          const autocomplete = new window.google.maps.places.Autocomplete(
            inputRef.current,
            {
              types: ['(cities)']
            }
          );
          autocomplete.addListener('place_changed', async () => {
            const place = autocomplete.getPlace();
            if (place && place.formatted_address) {
              const { extractAddressComponent } = await import(
                '@/utils/location'
              );
              const { lat, lng, formataddress, city, state } =
                extractAddressComponent(place);
              setLocation &&
                setLocation({ lat, lng, formataddress, city, state });
              window.localStorage.setItem(
                'userlocation',
                JSON.stringify({ lat, lng, formataddress, city, state })
              );
            } else {
              setErrorMessage('No address found.');
            }
          });
        }
      })
      .catch((error) => {
        console.error('Google Maps Initialization Error:', error); // Debug error
        setErrorMessage(error);
      });
  }, []);

  return (
    <>
      <>
        <div className="modal-overlay-swipepage"></div>
        <div className="modal-swipepage">
          <h2 className="text-center">Choose your location</h2>
          <p className="text-xs text-center text-gray-600 mt-2 mb-3">
            Zestful amigos would like to access your location, to get better
            results.
          </p>
          <div className="locationacessbtn">
            <button onClick={requestLocation}>Allow Location Access</button>
          </div>
          <h4 className="hrline mx-3 my-3 text-gray-600"> or </h4>
          <p>Enter Manually</p>
          <div className="enterlocationbtn mt-2">
            <input ref={inputRef} type="text" placeholder="Enter location" />
          </div>
          <button
            onClick={handleManualLocationSubmit}
            className="manual-location-btn"
          >
            Submit
          </button>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
      </>
    </>
  );
};

export function GoogleSignUp({ handleClose, userId }) {
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState({
    images: null,
    phoneno: '',
    age: 18,
    gender: ''
  });
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    const validTypes = ['image/jpeg', 'image/png'];
    if (file && validTypes.includes(file.type) && file.size < 2 * 1024 * 1024) {
      setData((prev) => ({ ...prev, images: file }));
      setErrors((prev) => ({ ...prev, profilePicture: '' }));
    } else {
      setErrors((prev) => ({
        ...prev,
        profilePicture: 'Please upload a valid image file.'
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const validTypes = ['image/jpeg', 'image/png'];
    if (file && validTypes.includes(file.type) && file.size < 2 * 1024 * 1024) {
      setData((prev) => ({ ...prev, images: file }));
      setErrors((prev) => ({ ...prev, profilePicture: '' }));
    } else {
      setErrors((prev) => ({
        ...prev,
        profilePicture: 'Please upload a valid image file.'
      }));
    }
  };
  const validate = () => {
    const newErrors = {};
    if (!data.images) newErrors.profilePicture = 'Profile picture is required.';
    if (!data.age) newErrors.age = 'Age is required.';
    else if (data.age < 18 || data.age > 100)
      newErrors.age = 'Age must be above 18.';
    if (!data.phoneno) newErrors.phoneNumber = 'Phone number is required.';
    else if (!/^\d{10}$/.test(data.phoneno))
      newErrors.phoneNumber = 'Enter a valid 10-digit phone number.';
    if (!data.gender) newErrors.gender = 'Gender is required.';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setisLoading(() => true);
        const { updateuserProfileDetailsService } = await import(
          '@/services/user/userprofile.service'
        );
        const { toast } = await import('@/utils/reduxtrigger.utils');
        const userData = new FormData();
        userData.append('age', data.age);
        userData.append('gender', data.gender);
        userData.append('phoneno', data.phoneno);
        if (typeof data.images === 'object') {
          userData.append('images', data.images);
        }
        const { data: updatedata, error } =
          await updateuserProfileDetailsService(userData, userId);
        if (updatedata) {
          toast.success('Successfully created User Now you can login!');
          handleClose();
        } else {
          toast.error(error);
        }
      } catch (error) {
      } finally {
        setisLoading(() => false);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((l) => ({ ...l, [name]: value }));
    if (Object.values(errors).length) {
      setErrors({});
    }
  };
  return (
    <div>
      <div className="google-modal-overlay">
        <div className="google-modal-content">
          {/* <button className="close" onClick={() => handleClose()}>
            &times;
          </button> */}
          <h2 className="font-bold  my-3">Complete Your Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="google-uploader-container">
              {!data.images ? (
                <div
                  className={`google-dropzone ${isDragging ? 'active' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="google-file-input"
                  />
                  <div className="google-placeholder">
                    <i className="google-upload-icon flex justify-center">
                      {' '}
                      <IoCloudUploadOutline size={30} color="black" />
                    </i>
                    <p className="text-black">
                      <strong>Click to upload</strong>
                    </p>
                    <span className="text-black text-xs">
                      Use portrait image for better display
                    </span>
                  </div>
                </div>
              ) : (
                <div className="google-preview-container">
                  <div className="google-image-wrapper">
                    <img
                      src={URL.createObjectURL(data.images)}
                      alt="Uploaded Preview"
                      className="google-preview-box"
                    />
                    <button
                      className="google-remove-button"
                      onClick={() =>
                        setData((prev) => ({ ...prev, images: null }))
                      }
                    >
                      ✖
                    </button>
                  </div>
                </div>
              )}
              {errors.profilePicture && (
                <p className="text-xs">{errors.profilePicture}</p>
              )}
            </div>
            <p className="text-sm mt-2 mb-1">Age</p>
            <input
              type="text"
              value={data.age}
              name="age"
              onChange={handleChange}
              min="18"
              max="120"
              required
              placeholder="Age"
              className="inputfield-glg"
            />
            {errors.age && <p className="text-xs">{errors.age}</p>}
            <br />
            <p className="text-sm mt-2 mb-1">Phone Number</p>
            <input
              type="tel"
              value={data.phoneno}
              name="phoneno"
              onChange={handleChange}
              pattern="[0-9]{10}"
              maxLength="10"
              required
              placeholder="Enter 10-digit phone number"
              className="inputfield-glg"
            />
            {errors.phoneNumber && (
              <p className="text-xs">{errors.phoneNumber}</p>
            )}

            <select
              className="select-gender"
              value={data.gender}
              name="gender"
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            {errors.gender && <p className="text-xs">{errors.gender}</p>}
            <br />
            <div className="my-3">
              <button type="submit" className="sbtbtm" disabled={isLoading}>
                {isLoading ? 'Submitting' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export const Emailverification = ({ handleModel, ...props }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setisLoading] = useState(false);
  const [resendPassword, setResendPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!resendPassword) {
      setTimeout(() => {
        setResendPassword(() => true);
      }, 1000);
    }
  }, [resendPassword]);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (error) {
        setError('');
      }
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    if (otp.includes('')) {
      setError('Please fill in all the fields');
    } else {
      setisLoading(() => true);
      const { validateEmail } = await import(
        '@/services/auth/forgotpassword.service'
      );
      const { toast } = await import('@/utils/reduxtrigger.utils');
      const { data, error } = await validateEmail({
        OTP: otp.join(''),
        email: props.data.email
      });
      if (data) {
        toast.success('Successfully Validated your Email');
        if (props.data?.redirecturl) {
          router.push(props.data?.redirecturl);
        } else {
          handleModel({ open: false });
        }
      } else {
        setError('OTP is invalid');
      }
      setisLoading(() => false);
    }
  };

  const handleForgorPassword = async () => {
    setisLoading(() => true);
    const { forgotEmail } = await import(
      '../services/auth/forgotpassword.service'
    );
    const { toast } = await import('@/utils/reduxtrigger.utils');
    if (props.data?.email) {
      const { data } = await forgotEmail({
        email: props.data.email,
        emailverification: true
      });
      if (data) {
        toast.success('Successfully Send the OTP to your email');
        setResendPassword(() => false);
      } else {
        toast.error('Error Ocuured Please try again!');
      }
    }
    setisLoading(() => false);
  };

  return (
    <div className="extension-modal-overlay">
      <div className="extension-modal-content">
        <h1 className="text-2xl text-center mt-2 font-bold text-black">
          Email Verification
        </h1>
        <h1 className="text-center text-xs text-black">
          Drop Your Email Verification Code
        </h1>
        <div className="pin-inputs mt-4">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              className="pin-input"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
            />
          ))}
        </div>
        {resendPassword && (
          <div className="text-sm text-gray-700 flex justify-center my-2">
            <span>If you dont' receive code </span>
            <span
              className="text-pink-600 cursor-pointer"
              onClick={handleForgorPassword}
            >
              Resend Code
            </span>
          </div>
        )}
        <button
          className="companion-cancel-btn mt-2"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Plese wait' : 'Submit'}
        </button>
        {error && <p className="text-xs text-black">{error}</p>}
      </div>
    </div>
  );
};

export const Baselocationmodel = ({
  closeModal,
  baselocations,
  sendlocation
}) => {
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setSelected(event.target.value);
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selected) {
      setError('Please select any option.');
    } else {
      const { lat, lng } = baselocations[Number(selected)];
      console.log(baselocations[Number(selected)]);
      sendlocation(`https://www.google.com/maps?q=${lat},${lng}`);
      closeModal();
    }
  };

  return (
    <div className="extension-modal-overlay">
      <div className="extension-modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h1 className="text-xl text-center my-2 font-bold">
          Choose a baselocation to share
        </h1>
        <form onSubmit={handleSubmit}>
          {baselocations.map((l, i) => (
            <div className="mb-2" key={i * 200}>
              <input
                type="checkbox"
                name="option"
                value={i}
                checked={i == selected}
                onChange={handleChange}
              />
              <label className="text-sm ml-2">{l.googleformattedadress}</label>
            </div>
          ))}
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" className="companion-cancel-btn mt-2">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export const Guidmodel = ({ closeModal }) => {
  return (
    <>
      <div className="Guild-modal-overlay">
        <div
          className="Guild-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="font-bold text-2xl text-center">Guildelines</h2>
          <div className="flex items-center gap-2 text-xl mt-3">
            <h1>Safety Guildelines for Visits </h1>
            <AiOutlineSafety color="pink" />
          </div>
          <h1 className="text-sm my-2">
            To ensure your safety and maintain the highest standards of service,
            please adhere to the following instructions when meeting clients:
          </h1>
          <div className="flex items-center gap-2 text-xl mt-3">
            <h1>Approved Location</h1>
            <GoLocation color="pink" />
          </div>
          <div className="ml-2 text-sm mt-2 gap-2">
            <li>
              Meet only in public, secure venues such as well-known cafes,
              restaurants, hotels, or coworking spaces.
            </li>
            <li>
              Commercial zones and high-traffic areas are preferred, ensuring
              proper lighting and accessibility.{' '}
            </li>
            <li>
              Corporate and private events that have undergone security
              verification are permissible, provided the venue meets safety
              standards.
            </li>
            <li>
              {' '}
              If unsure about a location, consult with your supervisor before
              confirming the visit.
            </li>
          </div>
          <div className="flex items-center gap-2 text-xl mt-3">
            <h1>Prohibited Location</h1>
            <CiLocationOff color="pink" />
          </div>
          <div className="ml-2 text-sm mt-2 gap-2">
            <li>
              Remote or isolated areas are strictly off-limits. This includes
              any location with poor visibility, security, or lighting.
            </li>
            <li>
              Avoid any private residences unless explicitly approved and
              background-checked by our team.
            </li>
            <li>
              {' '}
              High-risk neighborhoods identified for crime or unsafe conditions
              should never be considered for client meetings.
            </li>
            <li>
              Any abandoned or under-construction sites are strictly prohibited.
            </li>
          </div>
          <div className="flex items-center gap-2 text-xl mt-3">
            <h1>Additional Safety Measure</h1>
            <BiLocationPlus color="pink" />
          </div>
          <div className="ml-2 text-sm mt-2">
            <li>
              Always share your location in real-time with your supervisor
              during visits.{' '}
            </li>
            <li>
              Carry a mobile phone with emergency contacts readily accessible.
            </li>
            <li>
              If you feel unsafe or uncomfortable at any time, immediately exit
              the situation and report it to management.
            </li>
          </div>
          <div className="flex items-center gap-2 text-xl mt-3">
            <h1>Suggested Timings</h1>
            <IoIosTimer color="pink" />
          </div>
          <div className="ml-2 text-sm mt-2">
            <li>
              Daytime Visits: Preferably between 10:00 AM and 7:00 PM, when
              there is ample daylight and higher public activity.
            </li>
            <li>
              Evening Visits: If necessary, schedule between 7:00 PM and 10:00
              PM only in well-secured, high-traffic areas.
            </li>
            <li>
              No Late-Night Visits: Avoid scheduling any visits after 10:00 PM
              for safety reasons, unless it's a secure, verified venue (e.g.,
              corporate events, hotels).
            </li>
          </div>
          <button onClick={closeModal}>Continue</button>
        </div>
      </div>
    </>
  );
};
