'use client';
import Image from 'next/image';
import Party1 from '@/shared/Assets/party1.png';
import Party2 from '@/shared/Assets/party2.png';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import React, { useEffect, useState } from 'react';
import { getBookingDetailsforAll } from '@/services/user/bookings.service';
import { redirect } from 'next/navigation';
import { BASEURL } from '@/Constants/services.constants';

const page = () => {
  const [hover, setHover] = useState(0);
  const [data, setData] = useState({ rating: 0, comment: '' });
  const [bookingDetails, setBookingDetails] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const bookingId = params.get('bookingId');
    if (!bookingId) {
      redirect('/');
    } else {
      getBookingDetailsforAll(bookingId).then(({ data: resdata }) => {
        if (resdata) {
          const values = {
            user: resdata.User?.filter((l) => !l.isCompanion)[0],
            companion: resdata.User?.filter((l) => l.isCompanion)[0]
          };
          setBookingDetails(values);
        } else {
          redirect('/user/chat');
        }
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];
    if (!data.rating) {
      newErrors.push('Please select a rating.');
    }
    if (!data.comment.trim().length) {
      newErrors.push('Please provide a review.');
    }
    setErrors(newErrors);
    if (newErrors.length > 0) {
      return;
    }
    const { rateaBookingService } = await import(
      '@/services/user/bookings.service'
    );
    const params = new URL(document.location.toString()).searchParams;
    const bookingId = params.get('bookingId');
    const { data: bookingdata } = await rateaBookingService({
      ...data,
      bookingid: Number(bookingId)
    });
    if (bookingdata) {
      setData({ rating: 0, comment: '' });
      setErrors([]);
      redirect('/user/chat');
    }
  };

  if (!bookingDetails) return <div>Loading...</div>;
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
            <Image
              src={BASEURL + '/' + bookingDetails?.companion?.Images[0]}
              alt="Picture of the author"
              width={200}
              height={200}
            />
          </div>
          <h1 className="text-center ">
            How would you Rate your Experience with our “
            {bookingDetails?.companion?.firstname || 'Sarah'}”
          </h1>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={`star-button ${(hover || data.rating) >= star ? 'active-star' : 'inactive-star'}`}
                    onClick={() => setData((l) => ({ ...l, rating: star }))}
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
                value={data.comment}
                onChange={(e) =>
                  setData((l) => ({ ...l, comment: e.target.value }))
                }
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
