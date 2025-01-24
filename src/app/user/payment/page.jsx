'use client';
import React, { useState } from 'react';
import Chatheader from '@/components/Masterheader';
import { Notification } from '../swipepage/page';
import Image from 'next/image';
import Payment from 'src/app/payment1.png';
import { Threeline } from '../swipepage/page';

const page = () => {
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false
  });

  const [errors, setErrors] = useState({
    checkbox1: '',
    checkbox2: ''
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
    }
  };




  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "./aboutus" },
    { name: "Privacy Policy", href: "./privacypolicy" },
    { name: "Contact", href: "./contactus" }
  ];
  return (
    <div>
      <Chatheader rightElement={<Notification />} backgroundColor="rgba(250, 236, 236, 0.8)" navLinks={navLinks}/>
      <Threeline/>
      <div className="paymentsummarybox">
        <div className="paymentsummary">
          <div className="paymentbox">
            <h1 className="md:text-2xl font-semibold">Summary of payment</h1>
            <h3 className="text-base my-4">Description amount(INR)</h3>
            <table className="mt-2">
              <tbody>
                <tr>
                  <th className="text-sm font-normal">Base price</th>
                  <td className="text-sm font-normal ">: ₹6000.00</td>
                </tr>

                <tr>
                  <th className="text-sm font-normal">Gst(18%) fee</th>
                  <td className="text-sm font-normal">: ₹1080.00</td>
                </tr>

                <tr>
                  <th className="text-sm font-normal">Total Amount</th>
                  <td className="text-sm font-normal">: ₹7080.00</td>
                </tr>
              </tbody>
            </table>
            <form onSubmit={handleSubmit}>
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
              {errors.checkbox1 && <p className='text-xs text-red-800'>{errors.checkbox1}</p>}
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
              <button className="paymentbtn" type="submit">
                proceed to payment
              </button>
            </form>
          </div>
        </div>
        <div className="paymentimage">
          <Image src={Payment} alt='payment image'/>
        </div>
      </div>
    </div>
  );
};

export default page;
