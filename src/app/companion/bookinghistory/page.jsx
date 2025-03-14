'use client';
import React, { useEffect, useState } from 'react';
import Chatheader from '@/components/Masterheader';
import Notify from '@/components/Notify';
import { Mastersidebar } from '@/components/MasterSidebar';
import BookingHistory from '@/components/BookingHistory';
import UpcomingBooking from '@/components/UpcomingBooking';
import Loadingbar from '@/components/Loadingbar';

const Page = () => {
  const [historydata, setHistoryData] = useState(null);
  const [activeTab, setActiveTab] = useState('history');

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
              user: data[i].users.filter((l) => !l.isCompanion)[0],
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

  if (!historydata) {
    return <Loadingbar />;
  }

  return (
    <div>
      <Chatheader backgroundColor="rgba(250, 236, 236, 0.8)" />
      <div className="notifymbsecond">
        <Notify backgroundColor="transparent" color="black" />
      </div>
      <div className="bookingbox">
        <Mastersidebar isCompanion={true} className="sbar-height-chat" />
        <div className="booking-side">
          <div className="booking-type">
            <div
              className={
                activeTab === 'upcoming'
                  ? 'text-sm font-bold flex items-center bottomline2 cursor-pointer'
                  : 'text-sm font-bold flex items-center cursor-pointer'
              }
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming{' '}
            </div>
            <div
              className={
                activeTab === 'history'
                  ? 'text-sm font-bold flex items-center bottomline2 cursor-pointer'
                  : 'text-sm font-bold flex items-center cursor-pointer'
              }
              onClick={() => setActiveTab('history')}
            >
              History{' '}
            </div>
          </div>
        </div>
        <div className="booking-box">
          {(() => {
            switch (activeTab) {
              case 'history':
                return (
                  <BookingHistory
                    bookingdata={historydata.pastBooking}
                    isCompanion={true}
                  />
                );

              case 'upcoming':
                return (
                  <UpcomingBooking
                    bookingdata={historydata.upcoming}
                    isCompanion={true}
                  />
                );
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default Page;
