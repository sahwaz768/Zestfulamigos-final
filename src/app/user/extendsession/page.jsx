'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Payment from '@/shared/Assets/payment1.png';
import Masterheader from '@/components/Masterheader';
import { useRouter } from 'next/navigation';

const ExtensionBookingPage = () => {
  const [bookingdata, setBookingData] = useState({ purpose: '' });
  const router = useRouter();

  useEffect(() => {
    return () => {
      const location = window.location.pathname;
      if (location !== '/user/chat' && location !== '/user/extendsession') {
        console.log('Backbutton clicked');
      }
    };
  },[]);

  return (
    <>
      <Masterheader backgroundColor="rgba(250, 236, 236, 0.8)" />
      <div className="timeslotebox timeslote-textarea">
        <h1 className="text-black md:text-2xl font-semibold my-4">
          Purpose of Engagement
        </h1>
        <textarea
          value={bookingdata.purpose}
          onChange={(e) =>
            setBookingData((l) => ({ ...l, purpose: e.target.value }))
          }
          placeholder="Purpose..."
          className="purposeinput"
          required
        ></textarea>
        <h1 className="my-3 text-sm">
          Specify the Location for Companion Meet-Up
        </h1>
        {/* <LocationInput location={location} setLocation={setLocation} /> */}

        <div className="mt-2 ">
          <input
            type="checkbox"
            checked={true}
            onChange={() => console.log('confirm')}
          />
          <span className="ml-2 text-sm">Confirm the meet-up location</span>
        </div>

        {/* {errorMessage && <p className="error text-xs">{errorMessage}</p>} */}
      </div>
      <div className="paymentsummarybox">
        <div className="paymentsummary">
          <div className="paymentbox">
            <h1 className="md:text-2xl font-semibold">Summary of payment</h1>
            <h3 className="text-base my-4">Description amount(INR)</h3>
            <table className="mt-2">
              <tbody>
                <tr>
                  <th className="text-sm font-normal">Base price</th>
                  <td className="text-sm font-normal ">: ₹1200</td>
                </tr>

                <tr>
                  <th className="text-sm font-normal">
                    Gst(18%) fee(Included)
                  </th>
                  <td className="text-sm font-normal">: ₹0.00</td>
                </tr>

                <tr>
                  <th className="text-sm font-normal">Total Amount</th>
                  <td className="text-sm font-normal">:₹1200</td>
                </tr>
              </tbody>
            </table>
            <div className="flex mt-3">
              <input
                type="checkbox"
                name="checkbox1"
                checked={true}
                onChange={() => console.log('i agree')}
              />
              <p className="text-xs font-normal ml-2">
                I agree to the <a>Term and Condition</a> and Privacy policy
              </p>
            </div>
            {/* {errors.checkbox1 && (
              <p className="text-xs text-red-800">{errors.checkbox1}</p>
            )} */}
            <div className="flex my-2">
              <input
                type="checkbox"
                name="checkbox2"
                checked={true}
                onChange={() => console.log('')}
              />
              <p className="text-xs font-normal ml-2">
                I authorize the merchant to debit the above amount for selected
                service
              </p>
            </div>
            {/* {errors.checkbox2 && (
              <p className="text-xs text-red-800">{errors.checkbox2}</p>
            )} */}
            <button
              className="paymentbtn"
              type="submit"
              onClick={() => router.push('/user/chat')}
            >
              proceed to payment
            </button>
          </div>
        </div>
        <div className="paymentimage">
          <Image src={Payment} alt="payment image" />
        </div>
      </div>
    </>
  );
};

export default ExtensionBookingPage;
