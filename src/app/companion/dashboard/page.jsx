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

import Link from 'next/link';

const Page = () => {
  const userDetails = useSelector((state) => state.AuthReducer.data);
  const [bookingData, setBookingData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [lastrate,setlastrate] = useState()

  const fetchData = async () => {
    try {
      setLoading(true);
      const { getUpcomingBookingforCompanion } = await import(
        '@/services/user/bookings.service'
      );

      // Initial load - no pageNo means page 1
      const result = await getUpcomingBookingforCompanion();

      if (result.data) {
        setBookingData(result.data);
        console.log('Initial booking data:', result.data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const RatingData = async () => {
    try {
      setLoading(true);
      const { getRatingforUser } = await import(
        '@/services/user/bookings.service'
      );

      // Initial load - no pageNo means page 1
      const result = await getRatingforUser();

      if (result.data) {
        
        setlastrate(result.data[0]?.last_rating);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    RatingData();
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
                  <div className="flex items-center">{lastrate}</div>
                </div>
              </div>
              
            </div>
          </div>

          {/* ✅ FIXED: Proper null checking and pagination */}
          {bookingData?.bookings?.length > 0 ? (
            <div className=" p-3 md:p-5">
              <div className="max-w-full ">
                {/* Header */}
                <div className="mb-5">
                  <h2 className="text-lg md:text-xl font-bold text-red-600 mb-1">
                    Your Bookings
                  </h2>
                  <p className="text-xs md:text-sm text-gray-500">
                    View and manage your upcoming bookings
                  </p>
                </div>

                {/* Bookings Grid */}
                <div className="space-y-2 mb-5">
                  {bookingData.bookings.map((listitem) => {
                    const user = listitem.users.find((u) => !u.isCompanion);
                    return (
                      <div
                        key={listitem.id}
                        className="group  bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-red-100 hover:border-red-300"
                      >
                        <div className="flex justify-between sm:flex-row gap-3 p-3 md:p-4">
                          {/* Profile Image */}
                          <div className='flex gap-3'>
                          <div className="flex-shrink-0">
                            <div className="relative">
                              <div className="absolute inset-0 bg-red-400 rounded-lg blur opacity-15 group-hover:opacity-25 transition-opacity"></div>
                              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden flex items-center justify-center shadow-md border border-red-100">
                                <img
                                  src={
                                    user?.Images?.[0] ||
                                    '/api/placeholder/96/96'
                                  }
                                  alt={user?.firstname || 'User'}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          </div>

                          {/* User Details */}
                          <div className="flex-1 flex flex-col justify-center gap-1">
                            <div>
                              <span className="inline-block px-2 py-0.5 bg-red-100 text-red-600 text-xs font-semibold rounded">
                                Username:
                              </span>
                              <p className="text-sm md:text-base font-semibold text-gray-900 mt-0.5">
                                {user?.firstname || 'N/A'}
                              </p>
                            </div>

                            <div>
                              <span className="inline-block px-2 py-0.5 bg-red-100 text-red-600 text-xs font-semibold rounded">
                                Booking Time:
                              </span>
                              <p className="text-xs md:text-sm font-medium text-gray-700 mt-2 flex items-center gap-1">
                                <svg
                                  className="w-4 h-4 text-purple-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                                {formatBookingTimingsforUi(
                                  listitem.bookingstart,
                                  listitem.bookingend
                                )}
                              </p>
                            </div>
                          </div>
                          </div>

                          {/* Action Button */}
                          <div className="flex items-center justify-end pt-2 sm:pt-0">
                            <Link
                              href={`/companion/BookingrequestDetail?bookingid=${listitem.id}`}
                            >
                              <button className="px-4 py-1.5 md:px-5 md:py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-xs md:text-sm font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-1.5">
                                <span>Details</span>
                                <svg
                                  className="w-3.5 h-3.5 md:w-4 md:h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </button>
                            </Link>
                          </div>
                        </div>

                        {/* Gradient bottom border */}
                        <div className="h-0.5 bg-gradient-to-r from-red-400 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                      </div>
                    );
                  })}
                </div>

                {/* View All Button */}
                <div className="flex justify-center pt-1">
                  <Link href={'/companion/bookinghistory'}>
                    <button className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold text-sm rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 inline-flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      View all booking
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-white via-red-50 to-white flex items-center justify-center p-4 min-h-80">
              <div className="text-center max-w-xs">
                {/* Icon */}
                <div className="mb-3 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-400 rounded-full blur opacity-15"></div>
                    <div className="relative w-16 h-16 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                      <svg
                        className="w-8 h-8 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-red-600 mb-1">
                  No Upcoming Bookings
                </h3>
                <p className="text-xs text-gray-600 mb-4">
                  You don't have any upcoming bookings at the moment.
                </p>

                <Link href={'/companion/bookinghistory'}>
                  <button className="px-5 py-1.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold text-xs rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 inline-flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    View History
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
