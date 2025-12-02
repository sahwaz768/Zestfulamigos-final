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
          
          // Handle previous bookings
          const { bookings, ...otherdetails } = previousbookingdata;
          values.pastBooking = getBookingDataforUserUi(bookings);
          values.pastBookingDetails = otherdetails;
          
          // Handle upcoming bookings with pagination details
          const { bookings: upcomingBookings, ...upcomingOtherDetails } = upcomingbookingdata;
          values.upcoming = getBookingDataforUserUi(upcomingBookings);
          values.upcomingBookingDetails = upcomingOtherDetails;
          
          console.log('upcoming data:', values);

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
      const updatedValues = { ...historydata };
      const { bookings, ...otherdetails } = data;
      updatedValues.pastBooking = getBookingDataforUserUi(bookings);
      updatedValues.pastBookingDetails = otherdetails;
      setHistoryData(updatedValues);
    }
    setLoading(() => false);
  };

  const onUpcomingPageChange = async (pageNo) => {
    setLoading(() => true);
    const values = {
      pageNo
    };
    const { getUpcomingBookingforCompanion } = await import(
      '@/services/user/bookings.service'
    );
    const { getBookingDataforUserUi } = await import('@/utils/bookings.utils');
    const { data } = await getUpcomingBookingforCompanion(values);
    if (data) {
      
      const updatedValues = { ...historydata };
      const { bookings, ...otherdetails } = data;
      updatedValues.upcoming = getBookingDataforUserUi(bookings);
      updatedValues.upcomingBookingDetails = otherdetails;
      setHistoryData(updatedValues);
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
      
      const updatedValues = { ...historydata };
      const { bookings, ...otherdetails } = data;
      updatedValues.upcoming = getBookingDataforUserUi(bookings);
      updatedValues.upcomingBookingDetails = otherdetails;
      setHistoryData(updatedValues);
    }
    setLoading(() => false);
  };

  return (
    <>
      <div>
        <Chatheader backgroundColor="rgba(250, 236, 236, 0.8)" />
        <div className="notifymbsecond">
          <Notify backgroundColor="transparent" color="black" />
        </div>
        <div className="bookingbox">
          <Mastersidebar className="sbar-height-chat" isCompanion={true} />
          <div className="booking-side">
            <div className="booking-type">
              <div
                className={`text-sm font-bold flex items-center cursor-pointer ${activeTab === 'upcoming' ? 'bottomline2' : ''}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming{' '}
              </div>
              <div
                className={`text-sm font-bold flex items-center cursor-pointer ${activeTab === 'history' ? 'bottomline2' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                History{' '}
              </div>
            </div>
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
                           <div className='flex justify-center w-full'>
                          <div className=' bottom-0 w-fit mt-4'>
                          <Pagination
                            currentPage={
                              historydata.pastBookingDetails.currentPage
                            }
                            totalPage={
                              historydata.pastBookingDetails.totalPages
                            }
                            onPageChange={onPageChange}
                          />
                          </div>
                          </div>
                        </>
                      );

                    case 'upcoming':
                      return (
                        <>
                          <UpcomingBooking
                            isCompanion={true}
                            bookingdata={historydata.upcoming}
                            getUpcomingBooking={getUpcomingBooking}
                          />
                          <br />
                          {historydata.upcomingBookingDetails && (
                             <div className='flex justify-center w-full'>
                          <div className=' bottom-0 w-fit mt-4'>
                            <Pagination
                              currentPage={
                                historydata.upcomingBookingDetails.currentPage
                              }
                              totalPage={
                                historydata.upcomingBookingDetails.totalPages
                              }
                              onPageChange={onUpcomingPageChange}
                            />
                            </div>
                            </div>
                          )}
                        </>
                      );
                    default:
                      return null;
                  }
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;