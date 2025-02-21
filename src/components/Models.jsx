import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

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
          console.log('Error Occured');
          closeModal();
        }
      } catch (error) {}
      setError(''); // Clear error on successful submission
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
        <h1 className="text-2xl">slot extension</h1>
        <h1 className="text-xl text-center my-4">Extent your duration</h1>
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
            Requested access
          </button>
          <h1 className="text-center text-sm text-gray-600">
            Your Request is under process
          </h1>
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
  console.log('Model data', modeldata);
  const [resendPassword, setResendPassword] = useState(false);
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
          className="w-full loginbtn text-center"
          onClick={() => console.log('Verify')}
        >
          Proceed
        </button>
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
      alert('Password reset successful!');
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
  };

  const handleSubmit = async (e) => {
    const { loginUserService } = await import('../services/auth/login.service');
    const { datafetched } = await import('../Redux/auth/auth.reducer');
    const { decodeAccessToken } = await import('../utils/common.utils');
    const { appDispatch } = await import('@/Redux/store/store');
    const { ACCESS_TOKEN_LOC, REFRESH_TOKEN_LOC } = await import(
      '../Constants/common.constants'
    );
    const { setCookie } = await import('nookies');
    e.preventDefault();
    if (validateForm()) {
      const { data, error } = await loginUserService(formData);
      if (data) {
        const decodedToken = decodeAccessToken(data.access_token).decodedToken;
        appDispatch(datafetched(decodedToken));
        setCookie(null, ACCESS_TOKEN_LOC, data.access_token, { path: '/' });
        setCookie(null, REFRESH_TOKEN_LOC, data.refresh_token, { path: '/' });
        console.log(decodedToken);
        if (decodedToken.isCompanion) {
          router.push('/companion/dashboard');
        } else {
          router.push('/user/chat'); // Navigate to your desired route
        }
      } else {
        const response = error;
        document.getElementById('response').innerText = response;
      }
    }
  };

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
          className="flex glgbtn justify-center gap-2 items-center"
          onClick={() => console.log('Google login')}
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
          >
            login
          </button>
          {/* login form end here */}
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
      userId: bookingDetail?.userId,
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
        toast.success('Booking Cancelled Successfully');
        closeModal();
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
        <button onClick={closeModal} className="close">
          &times;
        </button>
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
          <button type="submit" className="companion-cancel-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
