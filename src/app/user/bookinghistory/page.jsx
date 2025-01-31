'use client';
import React, { useEffect, useState } from 'react';
import Chatheader from '@/components/Masterheader';
import { Notification } from '../swipepage/page';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { IoCalendarOutline } from 'react-icons/io5';
import { PiTimerThin } from 'react-icons/pi';
import { GrTransaction } from 'react-icons/gr';
import { RiServiceLine } from 'react-icons/ri';
import { MdPendingActions } from 'react-icons/md';
import { MdOutlinePaid } from 'react-icons/md';
import { Mastersidebar } from '../swipepage/page';
import Notify from '@/components/Notify';
import { capitalizedWord } from '@/utils/common.utils';
import { navLinks } from 'src/utils/constants.js';

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [historydata, setHistoryData] = useState(null);

  const showupcomingbooking = () => {
    document.getElementById('upcomingbtn').classList.add('bottomline');
    document.getElementById('historybtn').classList.remove('bottomline2');
    document.getElementById('closed-booking-box').style.display = 'none';

    document.getElementById('upcoming-booking-box').style.display = 'block';
  };
  const showcompletedbooking = () => {
    document.getElementById('closed-booking-box').style.display = 'block';
    document.getElementById('upcomingbtn').classList.remove('bottomline');
    document.getElementById('historybtn').classList.add('bottomline2');
    document.getElementById('upcoming-booking-box').style.display = 'none';
  };

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

  const links = navLinks; 


  return (
    <div>
      <Chatheader
        rightElement={<Notification />}
        backgroundColor="rgba(250, 236, 236, 0.8)"
        navLinks={links}
      />
      <div className="notifymbsecond">
        <Notify backgroundColor="transparent" color="black" />
      </div>
      <div className="bookingbox">
        <Mastersidebar />

        {isOpen && (
          <div className="modal-overlay-cancel">
            <div
              className="modal-container-cancel"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="">
                <h1 className="text-center text-2xl font-bold">Are you sure</h1>
                <div className="flex justify-center gap-2 mr-3 my-3">
                  <button className="yes">Yes</button>
                  <button className="no" onClick={() => setIsOpen(false)}>
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="booking-side">
          <div className="booking-type">
            <div
              className="text-sm font-bold flex  items-center pb-2 cursor-pointer"
              id="upcomingbtn"
              onClick={showupcomingbooking}
            >
              Upcoming{' '}
            </div>
            <div
              className="text-sm font-bold flex items-center bottomline2 cursor-pointer"
              id="historybtn"
              onClick={showcompletedbooking}
            >
              History{' '}
            </div>
          </div>
          <div className="booking-box">
            <div className="upcoming-booking-box" id="upcoming-booking-box">
              {historydata?.upcoming.length ? (
                historydata.upcoming?.map((l, i) => (
                  <div className="upcoming-slot" key={i * 500}>
                    <h1 className="text-sm font-bold text-gray-500">
                      Upcoming meting with {l.companion?.firstname}
                    </h1>
                    <div className="flex mt-4 gap-8">
                      <div className="flex items-center text-sm gap-2">
                        <IoCalendarOutline />
                        <h1>{l.bookingdate}</h1>
                      </div>
                      {/* <div className="flex items-center text-sm gap-2">
                    <PiTimerThin />
                    <h1>11.00AM-12.00PM</h1>
                  </div> */}
                    </div>
                    {/* <div className="flex mt-4 text-sm gap-2 items-center">
                  <GrTransaction />
                  <h1>Transaction id: 123456789</h1>
                </div> */}
                    <div className="flex mt-4 text-sm gap-2 items-center">
                      <RiServiceLine /> <h1>Service booked</h1>
                    </div>
                    <div className="flex mt-4 text-sm gap-2 items-center">
                      <MdPendingActions />
                      <h1>Status: {capitalizedWord(l.status)}</h1>
                    </div>
                    <div className="flex mt-4 text-sm gap-2 items-center">
                      <MdOutlinePaid />
                      <h1>Paid amount: {l.amount}</h1>
                    </div>
                    <div>
                      <button onClick={() => setIsOpen(true)}>cancel</button>
                    </div>
                  </div>
                ))
              ) : (
                <div>No Upcoming Bookings found</div>
              )}
            </div>
            <div className="closed-booking-box" id="closed-booking-box">
              {historydata?.pastBooking.length ? (
                historydata.pastBooking?.map((l, i) => (
                  <div className="upcoming-slot" key={i * 300}>
                    <h1 className="text-sm font-bold text-gray-500">
                      Last meting with {l.companion?.firstname}
                    </h1>
                    <div className="flex mt-4 gap-8">
                      <div className="flex items-center text-sm gap-2">
                        <IoCalendarOutline />
                        <h1>{l.bookingdate}</h1>
                      </div>
                      {/* <div className="flex items-center text-sm gap-2">
                    <PiTimerThin />
                    <h1>11.00AM-12.00PM</h1>
                  </div> */}
                    </div>
                    {/* <div className="flex mt-4 text-sm gap-2 items-center">
                  <GrTransaction />
                  <h1>Transaction id: 123456789</h1>
                </div> */}
                    <div className="flex mt-4 text-sm gap-2 items-center">
                      <RiServiceLine /> <h1>Service booked</h1>
                    </div>
                    <div className="flex mt-4 text-sm gap-2 items-center">
                      <MdPendingActions />
                      <h1>Status: {capitalizedWord(l.status)}</h1>
                    </div>
                    <div className="flex mt-4 text-sm gap-2 items-center">
                      <MdOutlinePaid />
                      <h1>Paid amount: {l.amount}</h1>
                    </div>
                    <div>
                      <button>Rate</button>
                      <button className="ml-4">Book again</button>
                    </div>
                  </div>
                ))
              ) : (
                <div>No Booking History Found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
