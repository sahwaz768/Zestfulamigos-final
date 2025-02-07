'use client';
import React, { useEffect, useState } from 'react';
import { PiSquaresFourDuotone } from 'react-icons/pi';
import Couple from '@/shared/Assets/dashcouple.png';
import Image from 'next/image';
import { IoIosStar } from 'react-icons/io';
import { Companionsidebar } from '../chat/page';
import Notify from '@/components/Notify';
import { useSelector } from 'react-redux';
import { BASEURL } from '@/Constants/services.constants';

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [historyData, setHistoryData] = useState(null);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // validation for text area
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    import('../../../services/user/bookings.service')
      .then(({ getPreviousBookings }) => getPreviousBookings())
      .then(async ({ data, error }) => {
        if (data) {
          const { formatBookingTimingsforUi } = await import(
            '../../../utils/bookings.utils'
          );
          const values = { pastBooking: [], upcoming: [] };
          for (let i = 0; i < data.length; i += 1) {
            const value = {
              id: data[i].id,
              companion: data[i].users.filter((l) => l.isCompanion)[0],
              bookingdate: formatBookingTimingsforUi(
                data[i].bookingstart,
                data[i].bookingend
              ),
              isPast:
                new Date(Number(data[i].bookingstart)).getTime() < Date.now(),
              status: data[i].status,
              amount: data[i].amount
            };
            if (value.isPast) values.pastBooking.push(value);
            else values.upcoming.push(value);
          }
          console.log(values);
          setHistoryData(values);
        }
      });
  }, []);

  const userDetails = useSelector((state) => state.AuthReducer.data);
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation check
    if (text.trim() === '') {
      setError('please specify the reason');
      return;
    }

    // If validation passes
    setError('');
    console.log('Submitted text:', text); // Log the textarea content to the console
    alert('Form submitted successfully!');
    setText(''); // Clear the textarea after submission
  };
  if (!userDetails) return <div>Loading....</div>;

  return (
    <>
      <div className="dashboard-threeline">
        <div className="notifymbsecond">
          <Notify backgroundColor="transparent" color="black" />
        </div>
      </div>
      <div className="flex">
        <div>
          <Companionsidebar userDetails={userDetails} />
        </div>
        <div className="dashboard">
          <div className="dashboard-header ">
            <div className="flex justify-center items-center ml-4 ">
              <div className="dots4">
                <PiSquaresFourDuotone color="gray" size={50} />
              </div>
              <div>
                <h1 className="font-bold">Dashboard</h1>
                <h1 className="text-sm text-pink-700">
                  {new Date().toLocaleString('en-US', { weekday: 'long' })}{' '}
                  <span className="text-black">
                    {' '}
                    {new Date().toLocaleString('en-US', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </span>
                </h1>
              </div>
            </div>
            <div className="comp-admin flex justify-center items-center">
              <Image
                src={BASEURL + '/UserPhotos/companion1.jpg'}
                alt="Picture of the author"
                width={20}
                height={20}
              />
              <h1 className="text-sm">{userDetails?.name}</h1>
            </div>
          </div>
          <div className="dashboard-midsection flex">
            <div className="mt-5">
              <h1 className="md:text-3xl font-bold ml-5 ">
                Hi, {userDetails?.name}
              </h1>
              <h1 className="md:mt-3 ml-5 md:text-base text-sm">
                Ready to start your day with same pitch decks
              </h1>
            </div>
            <div className="midsection-image">
              <Image src={Couple} alt="Picture of the author" />
            </div>
          </div>
          <div className="dashboard-overview">
            <h1>Overview</h1>
            <div className="flex gap-4">
              <div className="overview-box">
                <IoIosStar color="yellow" size={30} />
                <div>
                  Last rating
                  <div className="flex  items-center">
                    <IoIosStar color="yellow" size={15} />
                    <IoIosStar color="yellow" size={15} />
                  </div>
                </div>
              </div>
              <div className="overview-box">
                <IoIosStar color="yellow" size={30} />
                <div>
                  <h1>Total rating</h1>
                  <h1 className="font-bold">400/500</h1>
                </div>
              </div>
            </div>
          </div>
          {historyData?.upcoming.length ? (
            historyData.upcoming?.map((l) => (
              <div className="dashboard-userdetail">
                <div className="dashboard-userprofile">
                  <Image
                    src={BASEURL + '/UserPhotos/companion1.jpg'}
                    alt="Picture of the author"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="flex flex-wrap">
                  <div className="md:mt-2 ml-2 gap-2">
                    <h1 className="text-sm md:text-base">
                      Name:<span className="md:font-bold">{l.user?.firstname}</span>
                    </h1>
                    <h1 className="text-sm md:text-base">
                      Age:<span className="md:font-bold">20</span>
                    </h1>
                    <h1 className="text-sm md:text-base">
                      Gender:<span className="md:font-bold">Male</span>
                    </h1>
                  </div>
                  <div className="dashboard-purpose md:mt-2  gap-2">
                    <h1 className="text-sm md:text-base">
                      Time and date:
                      <span className="md:font-bold ">{l.bookingdate} </span>
                    </h1>
                    <h1 className="text-sm md:text-base">
                      Location of meet- up:
                      <span className="md:font-bold ">Bkc Mumbai</span>
                    </h1>
                    <h1 className="text-sm md:text-base">
                      Purpose of meet:
                      <span className="md:font-bold ">Dinner</span>
                    </h1>
                  </div>
                </div>
                <div className="dashboard-cancel">
                  <button onClick={openModal}>Cancel</button>
                </div>
              </div>
            ))
          ) : (
            <div>No Upcoming Bookings...</div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="companion-modal-overlay">
          <div
            className="companion-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeModal} className="close">
              &times;
            </button>
            <h1 className="text-center font-bold">Please specify the reason</h1>

            <form onSubmit={handleSubmit}>
              <div>
                <textarea
                  id="textarea"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Reason...."
                  className="companion-textarea"
                ></textarea>
              </div>
              {error && <div className="text-xs">{error}</div>}
              <button type="submit" className="companion-cancel-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
