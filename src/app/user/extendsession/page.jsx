'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Payment from '@/shared/Assets/payment1.png';
import Masterheader from '@/components/Masterheader';
import { useRouter } from 'next/navigation';
import { cancelExtensionRecord } from '@/services/sessions/extension.service';
import Loadingbar from '@/components/Loadingbar';
import LocationAccess from '@/components/Locationaccess';

const ExtensionBookingPage = () => {
  const [bookingdata, setBookingData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const bookingId = params.get('bookingId');
    if (bookingId && !bookingdata) {
      import('@/services/sessions/extension.service')
        .then(({ getExtensionBookingDetails }) =>
          getExtensionBookingDetails(bookingId)
        )
        .then(({ data }) => {
          if (data) {
            const values = {
              purpose: data.bookingpurpose,
              amount: data.updatedrate,
              extendedhours: data.extendedhours,
              user: data.userdetails?.filter((l) => !l.isCompanion)[0],
              companion: data.userdetails?.filter((l) => l.isCompanion)[0],
              id: data.id,
             // location: data.location
            };
            setBookingData(() => values);
          }
        });
    }
    return () => {
      if (bookingId) {
        const location = window.location.pathname;
        if (location !== '/user/extendsession') {
          cancelExtensionRecord(bookingId).then(({ data }) => {
            if (data) console.log('Successfylly update cancel extension');
          });
        }
      }
    };
  }, [router]);

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
        surl: 'https://localhost:3000/transaction/extensionsucess',
        furl: `https://localhost:3000/transaction/extensionfailure?bookingId=${paymentData.bookingId}`
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = {
      amount: String(bookingdata.amount),
      email: bookingdata.user.email,
      firstname: bookingdata.user.firstname,
      bookingId: bookingdata.id,
      phone: bookingdata.user.phoneno
    };
    const { updateExtensionRecord } = await import(
      '@/services/sessions/extension.service'
    );
    const updatevalues = {
      bookingid: bookingdata.id,
      extendedhours: bookingdata.extendedhours,
      extentedfinalrate: bookingdata.amount
    };
    const { data } = await updateExtensionRecord(updatevalues);
    if (data) await handlePayment(values);
  };

  const handleCancelExtension = async () => {
    try {
      const params = new URL(document.location.toString()).searchParams;
      const bookingId = params.get('bookingId');
      const { data } = await cancelExtensionRecord(bookingId);
      if (data) {
        router.push('/user/chat');
      } else {
        console.log();
      }
    } catch (error) {
      console.log('Some Error Occured');
    }
  };

  if (!bookingdata) return <div><Loadingbar/></div>;
  return (
    <>
      <Masterheader backgroundColor="rgba(250, 236, 236, 0.8)" />
      <div className='flex flex-col md:flex-row extention-container'>
      <div className='extention-textarea '>
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
        <LocationAccess  />

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
      </div>
      <div className="extention-payment mx-4 mt-5">
        <div className="">
          <div className="">
            <h1 className="md:text-2xl font-semibold">Summary of payment</h1>
            <h3 className="text-base my-4">Description amount(INR)</h3>
            <table className="mt-2">
              <tbody>
                <tr>
                  <th className="text-sm font-normal">Base price</th>
                  <td className="text-sm font-normal ">
                    : ₹{bookingdata.amount}
                  </td>
                </tr>

                <tr>
                  <th className="text-sm font-normal">
                    Gst(18%) fee(Included)
                  </th>
                  <td className="text-sm font-normal">: ₹0.00</td>
                </tr>

                <tr>
                  <th className="text-sm font-normal">Total Amount</th>
                  <td className="text-sm font-normal">
                    :₹{bookingdata.amount}
                  </td>
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
            <button className="paymentbtn" type="submit" onClick={handleSubmit}>
              proceed to payment
            </button>
            <button className="paymentbtn" onClick={handleCancelExtension}>
              Cancel Extension
            </button>
          </div>
        </div>
       
      </div>
      </div>
    </>
  );
};

export default ExtensionBookingPage;
