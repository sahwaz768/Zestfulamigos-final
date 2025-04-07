'use client';
import React, { useEffect, useState } from 'react';
import Chatheader from '@/components/Masterheader';
import Image from 'next/image';
import Payment from '@/shared/Assets/payment1.png';
import { redirect } from 'next/navigation';
import { getBookingDetails } from '@/services/user/bookings.service';
import Threeline from '@/components/ThreeLine';
import Loadingbar from '@/components/Loadingbar';

const page = () => {
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false
  });

  const [errors, setErrors] = useState({
    checkbox1: '',
    checkbox2: ''
  });

  const [bookingDetails, setBookingDetails] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const bookingId = params.get('bookingId');
    if (!bookingId) {
      redirect('/');
    } else {
      getBookingDetails(bookingId).then(({ data }) => {
        if (data) {
          const values = {
            bookingrate: data.bookingrate,
            finalamount: data.finalRate,
            user: data.User?.filter((l) => !l.isCompanion)[0],
            companion: data.User?.filter((l) => l.isCompanion)[0],
            id: data.id
          };
          setBookingDetails(values);
        } else {
          redirect('/user/chat');
        }
      });
    }
  }, []);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxes({
      ...checkboxes,
      [name]: checked
    });

    if (checked) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const handlePayment = async (paymentValues) => {
    const paymentData = {
      ...paymentValues,
      productinfo: 'Web'
    };

    try {
      const { initiateTransaction } = await import(
        '../../../services/transactions/makepayement.service'
      );
      const values = {
        ...paymentData,
        surl: process.env.NEXT_PUBLIC_UI_BASE_URL + '/transaction/success',
        furl:
          process.env.NEXT_PUBLIC_UI_BASE_URL +
          `/transaction/failure?bookingId=${paymentData.bookingId}`
      };
      const response = await initiateTransaction(values);
      const formContainer = document.createElement('div');
      formContainer.innerHTML = response;
      document.body.appendChild(formContainer);
      const form = document.forms['payment_post'];
      if (form) {
        form.submit();
      }
    } catch (error) {
      console.log('Payment Request Failed', error);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!checkboxes.checkbox1)
      newErrors.checkbox1 = 'Please agree to out term & condition.';
    if (!checkboxes.checkbox2)
      newErrors.checkbox2 = 'Please agree to our term & condition.';
    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(() => true);

    if (validate()) {
      const values = {
        amount: String(bookingDetails.finalamount),
        email: bookingDetails.user.email,
        firstname: bookingDetails.user.firstname,
        bookingId: bookingDetails.id,
        phone: bookingDetails.user.phoneno
      };

      await handlePayment(values);
      setisLoading(() => false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: './aboutus' },
    { name: 'Privacy Policy', href: './privacypolicy' },
    { name: 'Contact', href: './contactus' }
  ];
  if (!bookingDetails)
    return (
      <div>
        <Loadingbar />
      </div>
    );
  return (
    <div>
      <Threeline />
      <Chatheader
        backgroundColor="rgba(250, 236, 236, 0.8)"
        navLinks={navLinks}
      />
      <div className="paymentsummarybox">
        <div className="paymentsummary">
          <div className="paymentbox">
            <h1 className="md:text-2xl font-semibold">Summary of payment</h1>
            <h3 className="text-base my-4">Description amount(INR)</h3>
            <table className="mt-2">
              <tbody>
                <tr>
                  <th className="text-sm font-normal">Base price(Inclusive)</th>
                  <td className="text-sm font-normal ">
                    : ₹{bookingDetails.bookingrate.toFixed(2)}{' '}
                  </td>
                </tr>

                <tr>
                  <th className="text-sm font-normal">GST(18% Exclusive)</th>
                  <td className="text-sm font-normal">
                    : ₹{Number(bookingDetails.bookingrate * 0.18).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <th className="text-sm font-normal">Service Charge</th>
                  <td className="text-sm font-normal">: 0.00</td>
                </tr>

                <tr>
                  <th className="text-sm font-normal">Total Amount</th>
                  <td className="text-sm font-normal">
                    :₹{bookingDetails.finalamount.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex mt-3">
              <input
                type="checkbox"
                name="checkbox1"
                checked={checkboxes.checkbox1}
                onChange={handleCheckboxChange}
              />
              <p className="text-xs font-normal ml-2">
                I acknowledge that this service is for companionship and
                entertainment purposes only.
              </p>
            </div>
            {errors.checkbox1 && (
              <p className="text-xs text-red-800">{errors.checkbox1}</p>
            )}
            <div className="flex my-2">
              <input
                type="checkbox"
                name="checkbox2"
                checked={checkboxes.checkbox2}
                onChange={handleCheckboxChange}
              />
              <p className="text-xs font-normal ml-2">
                I understand and agree to the platform’s terms and conditions,
                including cancellation and refund policies.
              </p>
            </div>
            {errors.checkbox2 && (
              <p className="text-xs text-red-800">{errors.checkbox2}</p>
            )}
            <button
              className="paymentbtn"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Please wait....' : 'Proceed to payment'}
            </button>
          </div>
        </div>
        <div className="paymentimage">
          <Image src={Payment} alt="payment image" />
        </div>
      </div>
    </div>
  );
};

export default page;
