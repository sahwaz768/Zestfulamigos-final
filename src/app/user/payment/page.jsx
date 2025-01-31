'use client';
import React, { useEffect, useState } from 'react';
import Chatheader from '@/components/Masterheader';
import { Notification } from '../swipepage/page';
import Image from 'next/image';
import Payment from 'src/app/payment1.png';
import { Threeline } from '../swipepage/page';
import { useRouter } from 'next/navigation';
import { navLinks } from 'src/utils/constants.js';

import { redirect } from 'next/navigation';
import { getBookingDetails } from '@/services/user/bookings.service';

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

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const bookingId = params.get('bookingId');
    if (!bookingId) {
      redirect('/');
    } else {
      getBookingDetails(bookingId).then(({ data }) => {
        const values = {
          amount: data.bookingduration * data.bookingrate,
          user: data.User?.filter((l) => !l.isCompanion)[0],
          companion: data.User?.filter((l) => l.isCompanion)[0],
          id: data.id
        };
        console.log(values);
        setBookingDetails(values);
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
      productinfo: 'Web',
      phone: '9896014946'
    };

    try {
      const { initiateTransaction } = await import(
        '../../../services/transactions/makepayement.service'
      );
      const values = {
        ...paymentData,
        surl: 'http://localhost:3000/transaction/success',
        furl: 'http://localhost:3000/transaction/failure'
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
    if (validate()) {
      const values = {
        amount: String(bookingDetails.amount),
        email: bookingDetails.user.email,
        firstname: bookingDetails.user.firstname,
        bookingId: bookingDetails.id
      };
      await handlePayment(values);
    }
  };

  const links = navLinks; 

  if (!bookingDetails) return <div>Loading....</div>;
  return (
    <div>
      <Chatheader
        rightElement={<Notification />}
        backgroundColor="rgba(250, 236, 236, 0.8)"
        navLinks={links}
      />
      <Threeline />
      <div className="paymentsummarybox">
        <div className="paymentsummary">
          <div className="paymentbox">
            <h1 className="md:text-2xl font-semibold">Summary of payment</h1>
            <h3 className="text-base my-4">Description amount(INR)</h3>
            <table className="mt-2">
              <tbody>
                <tr>
                  <th className="text-sm font-normal">Base price</th>
                  <td className="text-sm font-normal ">: ₹{bookingDetails.amount.toFixed(2)} </td>
                </tr>

                <tr>
                  <th className="text-sm font-normal">
                    Gst(18%) fee(Included)
                  </th>
                  <td className="text-sm font-normal">: ₹0.00</td>
                </tr>

                <tr>
                  <th className="text-sm font-normal">Total Amount</th>
                  <td className="text-sm font-normal">:₹{bookingDetails.amount.toFixed(2)}</td>
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
                  I agree to the <a>Term and Condition</a> and Privacy policy
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
                  I authorize the merchant to debit the above amount for
                  selected service
                </p>
              </div>
              {errors.checkbox2 && (
                <p className="text-xs text-red-800">{errors.checkbox2}</p>
              )}
              <button className="paymentbtn" type="submit" onClick={handleSubmit}>
                proceed to payment
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
