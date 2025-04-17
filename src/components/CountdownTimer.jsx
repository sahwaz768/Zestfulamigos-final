'use client';
import { useState, useEffect, use } from 'react';

const CountdownTimer = ({ startTime, endTime }) => {
  const calculateRemainingTime = () => {
    const currentTime = Date.now();
    const offsetInMs = 5.5 * 60 * 60 * 1000;
    const remainingTime = endTime - currentTime - offsetInMs;

    if (remainingTime <= 0) return 0;

    return remainingTime;
  };

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime);
    }, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, [endTime]);

  const hoursRemaining = Math.floor(remainingTime / (1000 * 60 * 60));
  const minutesRemaining = Math.floor(
    (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
  );
  const secondsRemaining = Math.floor((remainingTime % (1000 * 60)) / 1000);

  const isNearEnd = remainingTime <= 5 * 60 * 1000; // 5 minutes or less

  return (
    <div className="countup-container">
      <div className="countup-box">
        <div className="countup-time">
          <div style={{ color: isNearEnd ? '' : 'black', fontSize: '20px' }}>
            <div className='flex justify-center text-sm'>
           <div className='text-sm flex justify-center bg-red-400 p-2 text-white rounded'>  Time Remaining:  {hoursRemaining ? `${hoursRemaining}h` : null}{' '}
              {minutesRemaining}m {secondsRemaining}s </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
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

export default CountdownTimer;
