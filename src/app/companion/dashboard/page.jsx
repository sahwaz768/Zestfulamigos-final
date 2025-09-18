'use client';
import React, { useEffect, useState } from 'react';
import { PiSquaresFourDuotone } from 'react-icons/pi';
import Couple from '@/shared/Assets/dashcouple.png';
import Image from 'next/image';
import { IoIosStar } from 'react-icons/io';
import { Mastersidebar } from '@/components/MasterSidebar';
import Notify from '@/components/Notify';
import { useSelector } from 'react-redux';
import Loadingbar from '@/components/Loadingbar';
import { formatBookingTimingsforUi } from '@/utils/bookings.utils';
import Pagination from '@/components/Pagination';
import Link from 'next/link';

const Page = () => {
  const userDetails = useSelector((state) => state.AuthReducer.data);
  const [Booking, setBooking] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { getUpcomingBookingforCompanion } = await import(
        '@/services/user/bookings.service'
      );
      const result = await getUpcomingBookingforCompanion();

      if (result.data) {
        setBooking(result.data);
      //  console.log('Upcoming booking data:', result.data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  if (!userDetails || isLoading) {
    return (
      <div>
        <Loadingbar />
      </div>
    );
  }

  return (
    <>
      <div className="dashboard-threeline">
        <div className="notifymbsecond">
          <Notify backgroundColor="transparent" color="black" />
        </div>
      </div>
      <div className="flex">
        <div>
          <Mastersidebar isCompanion={true} className="sbar-height" />
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
                    {new Date().toLocaleString('en-US', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </span>
                </h1>
              </div>
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
                  <div className="flex items-center">NA</div>
                </div>
              </div>
              <div className="overview-box">
                <IoIosStar color="yellow" size={30} />
                <div>
                  <h1>Average rating</h1>
                  NA
                </div>
              </div>
            </div>
          </div>

          {Booking?.bookings?.length > 0 ? (
            <>
              {Booking.bookings.map((listitem) => {
                const user = listitem.users.find((u) => !u.isCompanion);

                return (
                  <div className="dashboard-userdetail" key={listitem.id}>
                    <div className="dashboard-userprofile">
                      <Image
                        src={user?.Images?.[0] || Couple}
                        alt={user?.firstname || 'User'}
                        width={117}
                        height={111}
                      />
                    </div>
                    <div className="flex flex-wrap">
                      <div className="md:mt-2 ml-2 gap-2">
                        <h1 className="text-sm md:text-base">
                          Name:{' '}
                          <span className="md:font-bold">
                            {user?.firstname || 'NA'}
                          </span>
                        </h1>
                      </div>

                      <div className="dashboard-purpose md:mt-2 gap-2">
                        <h1 className="text-sm md:text-base">
                          Time and date:{' '}
                          <span className="md:font-bold">
                            {formatBookingTimingsforUi(
                              listitem.bookingstart,
                              listitem.bookingend
                            )}
                          </span>
                        </h1>
                      </div>
                    </div>

                    <div className="dashboard-cancel">
                      <Link
                        href={`/companion/BookingrequestDetail?bookingid=${listitem.id}`}
                      >
                        {' '}
                        <button>Check Details</button>
                      </Link>
                    </div>
                  </div>
                );
              })}

           
            </>
          ) : (
            <div>No Upcoming Bookings...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
