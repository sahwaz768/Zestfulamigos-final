'use client';
import React, { useEffect, useState } from 'react';
import Chatheader from '@/components/Masterheader';
import Notify from '@/components/Notify';
import { Mastersidebar } from '@/components/MasterSidebar';
import BookingHistory from '@/components/BookingHistory';
import UpcomingBooking from '@/components/UpcomingBooking';
import Loadingbar from '@/components/Loadingbar';
import Pagination from '@/components/Pagination';

const Page = () => {
  const [historydata, setHistoryData] = useState(null);
  const [activeTab, setActiveTab] = useState('history');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    import('@/services/user/bookings.service')
      .then(
        ({ getPreviousBookingsforCompanion, getUpcomingBookingforCompanion }) =>
          Promise.all([
            getPreviousBookingsforCompanion(),
            getUpcomingBookingforCompanion()
          ])
      )
      .then(
        async ([
          { data: previousbookingdata, error },
          { data: upcomingbookingdata }
        ]) => {
          const { getBookingDataforUserUi } = await import(
            '@/utils/bookings.utils'
          );
          const values = { pastBooking: [], upcoming: [] };
          const { bookings, ...otherdetails } = previousbookingdata;
          values.pastBooking = getBookingDataforUserUi(bookings);
          values.pastBookingDetails = otherdetails;
          values.upcoming = getBookingDataforUserUi(upcomingbookingdata);
          setHistoryData(values);
          setLoading(() => false);
        }
      );
  }, []);

  const onPageChange = async (pageNo) => {
    setLoading(() => true);
    const values = {
      pageNo
    };
    const { getPreviousBookingsforCompanion } = await import(
      '@/services/user/bookings.service'
    );
    const { getBookingDataforUserUi } = await import('@/utils/bookings.utils');
    const { data } = await getPreviousBookingsforCompanion(values);
    if (data) {
      const values = historydata;
      const { bookings, ...otherdetails } = data;
      values.pastBooking = getBookingDataforUserUi(bookings);
      values.pastBookingDetails = otherdetails;
      setHistoryData(values);
    }
    setLoading(() => false);
  };

  const getUpcomingBooking = async () => {
    setLoading(() => true);
    const { getUpcomingBookingforCompanion } = await import(
      '@/services/user/bookings.service'
    );
    const { getBookingDataforUserUi } = await import('@/utils/bookings.utils');
    const { data } = await getUpcomingBookingforCompanion();
    if (data) {
      const values = historydata;
      values.upcoming = getBookingDataforUserUi(data);
      setHistoryData(values);
    }
    setLoading(() => false);
  }

  return (
    <>
      <div>
        <Chatheader backgroundColor="rgba(250, 236, 236, 0.8)" />
        <div className="notifymbsecond">
          <Notify backgroundColor="transparent" color="black" />
        </div>
        <div className="bookingbox">
          <Mastersidebar isCompanion={true} className="sbar-height-chat" />
          {isLoading ? (
              <Loadingbar />
            ) : (
              <div className="booking-box">
                {(() => {
                  switch (activeTab) {
                    case 'history':
                      return (
                        <>
                          <BookingHistory
                            isCompanion={true}
                            bookingdata={historydata.pastBooking}
                          />
                          <Pagination
                            currentPage={
                              historydata.pastBookingDetails.currentPage
                            }
                            totalPage={
                              historydata.pastBookingDetails.totalPages
                            }
                            onPageChange={onPageChange}
                          />
                        </>
                      );

                    case 'upcoming':
                      return (
                        <UpcomingBooking
                          isCompanion={true}
                          bookingdata={historydata.upcoming}
                          getUpcomingBooking={getUpcomingBooking}
                        />
                      );
                    default:
                      return null;
                  }
                })()}
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default Page;
