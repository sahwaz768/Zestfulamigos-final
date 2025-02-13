'use client';
import Image from 'next/image';
import Party1 from '@/shared/Assets/party1.png';
import Party2 from '@/shared/Assets/party2.png';
import Photo from '@/shared/Assets/Rectangle 12.png';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import React, { useState } from 'react';

const page = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');
  const [errors, setErrors] = useState([]);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = [];
    if (rating === 0) {
      newErrors.push('Please select a rating.');
    }
    if (review.trim() === '') {
      newErrors.push('Please provide a review.');
    }
    setErrors(newErrors);
    if (newErrors.length > 0) {
      return;
    }
    alert(`Rating: ${rating}\nReview: ${review}`);
    setRating(0);
    setReview('');
    setErrors([]);
  };
  return (
    <>
      <div className="rate-box">
        <div className="party-1">
          <Image src={Party1} alt="Picture of the author" />
        </div>
        <div className="rate ">
          <div className="flex justify-center md:my-2 my-5">
            <RiVerifiedBadgeFill color="green" size={60} />
          </div>
          <h1 className="text-2xl font-bold text-center">
            Meet - up Successful
          </h1>
          <div className="rate-photo flex justify-center md:my-2 my-6">
            <Image src={Photo} alt="Picture of the author" />
          </div>
          <h1 className="text-center ">
            How would you Rate your Experience with our “Amigo”
          </h1>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={`star-button ${(hover || rating) >= star ? 'active-star' : 'inactive-star'}`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
              <h1 className="text-center md:my-2 my-5">
                What all did you enjoy?
              </h1>
              <textarea
                className="rate-text"
                placeholder="Write your review here..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <div className="flex justify-center">
                <button type="submit" className="rate-btn">
                  Submit
                </button>
              </div>
              {errors.length > 0 && (
                <div>
                  {errors.map((error, index) => (
                    <p key={index} className="text-sm text-pink-700">
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="party-2 ">
          <Image src={Party2} alt="Picture of the author" />
        </div>
      </div>
    </>
  );
};

export default page;
