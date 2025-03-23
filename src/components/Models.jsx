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

export const StartSessionModel = ({ closeModal, bookingid }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');

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
        const { startSession } = await import(
          '../services/sessions/usersessions.service'
        );
        const values = {
          bookingid: bookingid?.id,
          otp: Number(otpValue)
        };
        const { data } = await startSession(values);
        if (data) {
          closeModal();
          window.location.reload();
        } else {
          setError('Sorry Wrong OTP! Please try Again');
        }
      } catch (error) {}
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
        <button className="companion-cancel-btn mt-2" onClick={handleSubmit}>
          Submit OTP
        </button>
        {error && <p className="text-xs">{error}</p>}
      </div>
    </div>
  );
};

export const EndSessionModel = ({ closeModal, session }) => {
  const handleEndSession = async () => {
    try {
      const { endSession } = await import(
        '../services/sessions/usersessions.service'
      );
      const values = {
        sessionid: session?.id
      };
      const { data } = await endSession(values);
      if (data) {
        window.location.reload();
        closeModal();
      } else {
        console.log('Error Occured');
        closeModal();
      }
    } catch (error) {}
  };
  return (
    <div className="extension-modal-overlay">
      <div className="extension-modal-content">
        <div className="">
          <h1 className="text-center text-2xl font-bold">Are you sure</h1>
          <div className="flex justify-center gap-2 mr-3 my-3">
            <button className="yes" onClick={handleEndSession}>
              Yes
            </button>
            <button className="no" onClick={closeModal}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ExtensionModel = ({ closeModal, bookingid }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
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
      const { startextendCurrentSession } = await import(
        '../services/sessions/usersessions.service'
      );
      const values = {
        bookingid: bookingid?.id,
        extentedhours: selectedSlot
      };
      const { data } = await startextendCurrentSession(values);
      if (data) {
        router.push(`./extendsession?bookingId=${values.bookingid}`);
        closeModal();
      } else {
        console.log('Error Occured');
        closeModal();
      }
    } catch (error) {}
    console.log(`Selected slot: ${selectedSlot}`);
    setError('');
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
          <button className="extention-submit-button" onClick={handleSubmit}>
            Request access
          </button>
        </div>
      </div>
    </div>
  );
};

export const RaiseaIssueModel = ({ closeModal, userDetails }) => {
  const [formData, setFormData] = useState({
    // email: '',
    subject: '',
    explanation: '',
    image: null
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // if (!formData.email) {
    //   formErrors.email = 'Email is required.';
    // } else if (!emailRegex.test(formData.email)) {
    //   formErrors.email = 'Please enter a valid email.';
    // }

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
      console.log('Form submitted successfully:', formData);
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
          {/* <div className="form-group">
          <label htmlFor="email" className="text-sm">
            Email
          </label>

          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="inputfield-glg"
            placeholder="Email"
          />
          {errors.email && <p className="text-sm">{errors.email}</p>}
        </div> */}

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
            <button type="submit" className="sbtbtm">
              Submit
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
  const handleForgorPassword = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    const { forgotEmail } = await import(
      '../services/auth/forgotpassword.service'
    );
    const { data } = await forgotEmail({ email });
    if (data) {
      handleModel({ type: 'fillotp', open: true, data: { email } });
    } else {
      console.log('Error Occured');
    }
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
          <p>Email</p>
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
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export const FillOtpModel = ({ handleModel, data: modeldata }) => {
  const [resendPassword, setResendPassword] = useState(false);
  const [password, setpassword] = useState({
    password: '',
    confirmpassword: ''
  });
  const inputs = useRef([]);
  const [error, setError] = useState('');

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
        >
          Proceed
        </button>
        {error && <p className="text-pink-600">{error}</p>}
      </div>
    </div>
  );
};

export const SetNewPasswordModel = ({ handleModel }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({ newPassword: '', confirmPassword: '' });
  const [editingField, setEditingField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const validatePasswords = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    let errors = { newPassword: '', confirmPassword: '' };

    if (!passwordRegex.test(newPassword)) {
      errors.newPassword =
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number.';
    }
    if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }
    setError(errors);
    return !errors.newPassword && !errors.confirmPassword;
  };

  const handleInputFocus = (field) => {
    setEditingField(field);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      console.log('New Password:', newPassword);
      // Clear the input fields
      setNewPassword('');
      setConfirmPassword('');
      setError({ newPassword: '', confirmPassword: '' });
    }
  };

  return (
    <div className="resetpassword" id="resetpassword">
      <div>
        <h2 className="text-center text-xl my-3 font-bold text-black">
          Create New password
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <p className="text-black mt-3 text-sm">Enter new password</p>
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onFocus={() => handleInputFocus('newPassword')}
              onBlur={() => setEditingField(null)}
              placeholder="*********"
              className="inputfield "
            />
            {error.newPassword && editingField !== 'newPassword' && (
              <p className="text-xs text-pink-600">{error.newPassword}</p>
            )}
          </div>
          <div>
            <p className="text-black mt-3 text-sm">confirm password</p>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => handleInputFocus('confirmPassword')}
              onBlur={() => setEditingField(null)}
              className="inputfield "
              placeholder="**********"
            />
            {error.confirmPassword && editingField !== 'confirmPassword' && (
              <p className="text-xs text-pink-700">{error.confirmPassword}</p>
            )}
          </div>
          <div>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className="text-xs ml-2">Show Password</label>
          </div>
          <button type="submit" className="w-full loginbtn text-center">
            Reset
          </button>
        </form>
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
          if (decodedToken.isCompanion) {
            router.push('/companion/dashboard');
          } else {
            router.push('/user/chat');
          }
        } else {
          setErrors({ password: error });
        }
      } catch (error) {
        console.log('Error occured');
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
        <h1 className="text-center font-bold">Please specify the  reason</h1>

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
          <button type="submit" className="companion-cancel-btn">
            Submit
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
  const [profilePicture, setProfilePicture] = useState(null);
  const [data, setData] = useState({
    images: null,
    phoneno: '',
    age: 18,
    gender: ''
  });
  const [isDragging, setIsDragging] = useState(false);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState({});
  const [phoneNumber, setPhoneNumber] = useState('');

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
    if (file && file.type.startsWith('image/')) {
      setProfilePicture(URL.createObjectURL(file));
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
    if (file && file.type.startsWith('image/')) {
      setProfilePicture(URL.createObjectURL(file));
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
      } catch (error) {}
    }
  };
  const handleChange = (e) => {
    const { name, target } = e.target;
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
                      onClick={() => setProfilePicture(null)}
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
              <button type="submit" className="sbtbtm ">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
