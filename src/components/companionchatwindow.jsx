'use client';
import React, { useEffect, useState } from 'react';
import { IoCallOutline } from 'react-icons/io5';
import { VscSend } from 'react-icons/vsc';
import { CiLocationOn } from 'react-icons/ci';
import { IoIosArrowBack } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Companionchatwindow = () => {
  const [messages, setMessages] = useState([
    { text: 'Hi there!', sender: 'receiver', time: '12:00 PM' },
    { text: 'Hello!', sender: 'sender', time: '12:01 PM' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const filteredWords = ['badword1', 'badword2'];

  const censorMessage = (message) => {
    const regex = new RegExp(`\\b(${filteredWords.join('|')})\\b`, 'gi');
    return message.replace(regex, '****');
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${ampm}`;
  };

  const sendMessage = () => {
    if (inputValue.trim()) {
      const cleanMessage = censorMessage(inputValue);
      setMessages([
        ...messages,
        { text: cleanMessage, sender: 'sender', time: getCurrentTime() }
      ]);
      setInputValue('');
    }
  };

  const handlePhoneCall = () => {
    const phoneNumber = '+1234567890';
    window.location.href = `tel:${phoneNumber}`;
  };

  const sos = () => {
    const phoneNumber = '+1234567890';
    window.location.href = `tel:${phoneNumber}`;
  };

  const backbtn = () => {
    document.getElementById('chatlist').style.display = 'block';
    document.getElementById('chatwindow').style.display = 'none';
  };

  // funtion for drop-down

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // funtion for extension model //

  const [isOpenexmodel, setIsOpenexmodel] = useState(false);

  const openModal = () => setIsOpenexmodel(true);
  const closeModal = () => setIsOpenexmodel(false);

  const [isOpenexmodel2, setIsOpenexmodel2] = useState(false);

  const openModal2 = () => setIsOpenexmodel2(true);
  const closeModal2 = () => setIsOpenexmodel2(false);

  return (
    <>
      {isOpenexmodel && (
        <div className="extension-modal-overlay">
          <div className="extension-modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>

            <h1 className="text-2xl text-center mt-2 font-bold">
              OTP Verification
            </h1>
            <h1 className="text-center text-xs">Drop Your Companion OTP</h1>
            
          <Otpvalidation/>
          </div>
        </div>
      )}

      {isOpenexmodel2 && (
        <div className="extension-modal-overlay">
          <div className="extension-modal-content">
          <div className=''>
             <h1 className='text-center text-2xl font-bold'>Are you sure</h1>
             <div className='flex justify-center gap-2 mr-3 my-3'>
             <button className='yes'>Yes</button>
             <button className='no' onClick={closeModal2}>No</button>

             </div>
             </div>
            
          
          </div>
        </div>
      )}
      <div className="chat-window">
        <div className="chat-header">
          <div className="chatheader">
            <div className="user-details">
              <div className="flex">
                <div className="mt-2 mx-2 chatbackbtn" onClick={backbtn}>
                  <IoIosArrowBack color="black" size={25} />
                </div>

                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISmJ3wr4IfIf6Y8r22sRa072YxjfXJdu1WQ&s"
                  alt=""
                />
                <div className="ml-5 my-1">
                  <h1 className=" font-bold">Olivia Rhye</h1>
                  <p className="text-xs text-pink-700 ml-1 font-light">
                    Online
                  </p>
                </div>
              </div>
              <div className="callbtn" onClick={handlePhoneCall}>
                <IoCallOutline size={20} color="white" />
                <h1 className="text-lg">call</h1>
              </div>
              <div className="sos" onClick={sos}>
                SOS
              </div>
              <div className="mt-3 mr-4" onClick={toggleDropdown}>
                <BsThreeDotsVertical color="pink" size={30} />
              </div>
              {/* Dropdown Menu */}
              {isOpen && (
                <ul className="dropdown-menu-extension">
                  <div className="extension-slote" onClick={openModal}>
                    start session
                  </div>
                  <div className="extension-slote mt-2" onClick={openModal2}>
                    end session
                  </div>
                </ul>
              )}
            </div>
          </div>
          <div className="timer">
            <Timer />
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
                <br />
                <p className="msgtime">{msg.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-input">
          <div className="chat-input-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="chat-input-text"
              placeholder="type of massage"
            />
            <div className="send-button-chat flex">
              <div className="flex justify-center items-center mx-4">
                <CiLocationOn color="white" size={20} />
              </div>
              <div className="msgsendbtn" onClick={sendMessage}>
                <h1>Send</h1>
                <div>
                  <VscSend color="black" size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Timer = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        const newMinutes = (prevTime.minutes + 1) % 60;
        const newHours =
          prevTime.minutes + 1 === 60 ? prevTime.hours + 1 : prevTime.hours;

        // Stop the timer when it reaches 2 hours
        if (newHours === 2 && newMinutes === 0) {
          clearInterval(timer);
          return prevTime; // Stop updating
        }

        return { hours: newHours, minutes: newMinutes };
      });
    }, 60000); // Updates every 60 seconds

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, []);
  return (
    <>
      <div className="countup-container">
        <div className="countup-box">
          <div className="countup-time">
            {time.hours.toString().padStart(2, '0')}
          </div>
          <div className="countup-label">Hrs</div>
        </div>
        <div className="countup-box">
          <div className="countup-time">
            {time.minutes.toString().padStart(2, '0')}
          </div>
          <div className="countup-label">Mins</div>
        </div>
      </div>
    </>
  );
};



const Otpvalidation = () => {



  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");

  // Update OTP state on input
  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError("");

      // Move focus to the next input
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  // Handle backspace for seamless UX
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // Validate OTP form on submit
  const handleSubmit = () => {
    if (otp.includes("")) {
      setError("Please fill in all the fields");
    } else {
      const otpValue = otp.join("");
      console.log("Entered OTP:", otpValue);
      setError(""); // Clear error on successful submission
    }
  };
  return (
    <>
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
      {error && <p className='text-xs'>{error}</p>}
    </>
  )
}

export default Companionchatwindow;
