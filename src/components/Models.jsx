import { useRouter } from 'next/navigation';

const { useState } = require('react');

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
