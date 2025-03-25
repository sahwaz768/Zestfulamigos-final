'use client';
import { useEffect, useState } from 'react';
import Masterheader from '@/components/Masterheader';
import { useRouter } from 'next/navigation';
import { cancelExtensionRecord } from '@/services/sessions/extension.service';
import Loadingbar from '@/components/Loadingbar';
import LocationAccess from '@/components/Locationaccess';
import { CgDanger } from 'react-icons/cg';

const ExtensionBookingPage = () => {
  const [bookingdata, setBookingData] = useState(null);
  const [confirmationdata, setconfirmationdata] = useState({
    confirmlocation: false,
    confirmdebitamout: false,
    termsncondition: false
  });
  const [isAnyUpdatedData, setIsAnyUpdatedData] = useState({
    updatedLocation: null,
    updatePurpose: ''
  });
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
              bookingrate: data.bookingrate,
              amount: data.updatedrate,
              extendedhours: data.extendedhours,
              user: data.userdetails?.filter((l) => !l.isCompanion)[0],
              companion: data.userdetails?.filter((l) => l.isCompanion)[0],
              id: data.id,
              meetinglocation: data.meetinglocation
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
    const { toast } = await import('@/utils/reduxtrigger.utils');
    if (!Object.values(confirmationdata).every((l) => l)) {
      toast.error('Please confirm all the checkbox!');
      return;
    }
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
    if (isAnyUpdatedData.updatedLocation) {
      updatevalues['updatedLocation'] = isAnyUpdatedData.updatedLocation;
    }
    if (isAnyUpdatedData.updatePurpose) {
      updatevalues['updatedPurpose'] = isAnyUpdatedData.updatePurpose;
    }
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

  if (!bookingdata)
    return (
      <div>
        <Loadingbar />
      </div>
    );
  return (
    <>
      <Masterheader backgroundColor="rgba(250, 236, 236, 0.8)" />
      <div className="flex justify-center">
        <div className="flex items-center justify-center gap-3 bg-red-400 rounded-lg py-3 text-white w-3/4 md:w-1/4">
          <CgDanger color="white" size={25} />
          <h1>Please Do not refresh the page!</h1>
        </div>
      </div>
      <div className="flex flex-col md:flex-row extention-container">
        <div className="extention-textarea ">
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
            <div className="mt-4">
              <h1 className="text-lg font-extrabold">Current Location</h1>
              <h1 className="mt-2 font-bold">
                Location:{' '}
                <span className="text-sm font-normal">
                  {isAnyUpdatedData.updatedLocation?.formattedaddress ||
                    bookingdata.meetinglocation.googleformattedadress}
                </span>
              </h1>
            </div>
            <h1 className="my-3 text-sm">
              If you want to update location please mention it here
            </h1>
            <LocationAccess
              setLocation={(p) =>
                setIsAnyUpdatedData((l) => ({ ...l, updatedLocation: p }))
              }
            />
            <div className="mt-2 ">
              <input
                type="checkbox"
                checked={confirmationdata.confirmlocation}
                onChange={() =>
                  setconfirmationdata((l) => ({
                    ...l,
                    confirmlocation: !confirmationdata.confirmlocation
                  }))
                }
              />
              <span className="ml-2 text-sm">Confirm the updated location</span>
            </div>
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
                    <th className="text-sm font-normal">
                      Base price(Exclusive GST){' '}
                    </th>
                    <td className="text-sm font-normal ">
                      : ₹{bookingdata.bookingrate}
                    </td>
                  </tr>

                  <tr>
                    <th className="text-sm font-normal">GST (18%)</th>
                    <td className="text-sm font-normal">
                      : ₹{Number(bookingdata.bookingrate * 0.18).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-sm font-normal">Service Charge</th>
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
                  checked={confirmationdata.termsncondition}
                  onChange={() =>
                    setconfirmationdata((l) => ({
                      ...l,
                      termsncondition: !confirmationdata.termsncondition
                    }))
                  }
                />
                <p className="text-xs font-normal ml-2">
                  I acknowledge that this service is for companionship and
                  entertainment purposes only.
                </p>
              </div>
              <div className="flex my-2">
                <input
                  type="checkbox"
                  name="checkbox2"
                  checked={confirmationdata.confirmdebitamout}
                  onChange={() =>
                    setconfirmationdata((l) => ({
                      ...l,
                      confirmdebitamout: !confirmationdata.confirmdebitamout
                    }))
                  }
                />
                <p className="text-xs font-normal ml-2">
                  I understand and agree to the platform’s terms and conditions,
                  including cancellation and refund policies
                </p>
              </div>
              <button
                className="paymentbtn"
                type="submit"
                onClick={handleSubmit}
              >
                Proceed to payment
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
