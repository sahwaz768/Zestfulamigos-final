'use client';
import React, { useEffect, useState } from 'react';
import { PiSquaresFourDuotone } from 'react-icons/pi';
import Couple from '@/shared/Assets/Femalegender.svg';
import Image from 'next/image';
import { IoIosStar } from 'react-icons/io';
import { Mastersidebar } from '@/components/MasterSidebar';
import Notify from '@/components/Notify';
import { useSelector } from 'react-redux';
import Loadingbar from '@/components/Loadingbar';
import { formatBookingTimingsforUi } from '@/utils/bookings.utils';
import Link from 'next/link';
import Chatheader from '@/components/Masterheader';

const Page = () => {
  const userDetails = useSelector((state) => state.AuthReducer.data);
  const [bookingData, setBookingData] = useState(null);
  const [isLoading, setLoading] = useState(true);


  const fetchData = async () => {
    try {
      setLoading(true);
      const { getDashboardetails } = await import(
        '@/services/user/bookings.service'
      );

      // Initial load - no pageNo means page 1
      const result = await getDashboardetails();

      if (result.data) {
      //  console.log('COMPANION DASHBOARD DATA:', result.data[0]);
        setBookingData(result.data[0]);
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
      <Chatheader backgroundColor="rgba(250, 236, 236, 0.8)" />
      <div className="notifymbsecond">
        <Notify backgroundColor="transparent" color="black" />
      </div>
      <Mastersidebar className="sbar-height-chat" isCompanion={true} />
      <div className="min-h-screen  overflow-hidden">
        <div className="md:w-[75rem] w-[95%] mx-auto md:px-6 px-2 py-8 my-10">
          {/* Header Profile Section */}
          <div className=" rounded-3xl border border-red-200 md:p-8 p-5 md:mt-1 mb-10  shadow-lg  ">
            <div className="md:flex flex-row  md:items-center  md:justify-between ">
              <div className="flex items-center gap-5">
                <div className="relative ">
                  <div className="absolute"></div>
                  <Image
                    src={bookingData?.companionDetails?.images?.[0]}
                    width={75}
                    height={75}
                    className=" rounded-full object-cover "
                    alt="profile picture"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-3xl font-black bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                      {userDetails.name}
                    </h1>
                  </div>
                  <Link href={'/companion/slot'}>
                    {' '}
                    <div
                      className={`md:hidden flex items-center md:gap-4 gap-1 bg-gradient-to-r ${bookingData?.companionDetails?.isavailable === true ? 'from-green-50 to-green-50 border-green-200 hover:border-green-300' : 'from-red-50 to-red-50 border-red-200 hover:border-red-300'}rounded-2xl md:px-6 md:py-4 px-2 py-1  border  transition-all duration-300 group`}
                    >
                      <div className="flex items-center md:gap-4 gap-1">
                        <p className="text-xs text-black font-bold uppercase tracking-wider">
                          Availability:
                        </p>
                        <p
                          className={`text-sm font-black bg-gradient-to-r ${bookingData?.companionDetails?.isavailable === true ? ' from-green-600 to-green-500' : ' from-red-600 to-red-500'} from-green-600 to-green-500 bg-clip-text text-transparent`}
                        >
                          {bookingData?.companionDetails?.isavailable === true
                            ? 'ON'
                            : 'OFF'}
                        </p>
                      </div>
                      <span
                        className={`${bookingData?.companionDetails?.isavailable === true ? 'text-green-600' : 'text-red-600'} text-xl group-hover:translate-x-1 transition-transform duration-300`}
                      >
                        →
                      </span>
                    </div>{' '}
                  </Link>
                </div>
              </div>
              <Link href={'/companion/slot'}>
                <div className="hidden md:block">
                  <div
                    className={` flex items-center md:gap-4 gap-1 bg-gradient-to-r ${bookingData?.companionDetails?.isavailable === true ? 'from-green-50 to-green-50 border-green-200 hover:border-green-300' : 'from-red-50 to-red-50 border-red-200 hover:border-red-300'}  border rounded-2xl md:px-6 md:py-4 px-2 py-1     transition-all duration-300 group`}
                  >
                    <div className="flex items-center md:gap-4 gap-1">
                      <p className="text-xs text-black font-bold uppercase tracking-wider">
                        Availability:
                      </p>
                      <p
                        className={`text-sm font-black bg-gradient-to-r ${bookingData?.companionDetails?.isavailable === true ? ' from-green-600 to-green-500' : ' from-red-600 to-red-500'} from-green-600 to-green-500 bg-clip-text text-transparent`}
                      >
                        {bookingData?.companionDetails?.isavailable === true
                          ? 'ON'
                          : 'OFF'}
                      </p>
                    </div>
                    <span
                      className={`${bookingData?.companionDetails?.isavailable === true ? 'text-green-600' : 'text-red-600'} text-xl group-hover:translate-x-1 transition-transform duration-300`}
                    >
                      →
                    </span>
                  </div>
                </div>{' '}
              </Link>
            </div>
          </div>

          {/* Stats Cards with Enhanced Design */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            {/* This Month Earnings */}
            <div className="group bg-gradient-to-br from-white to-red-50 rounded-2xl border border-red-200 p-6 shadow-lg hover:shadow-2xl hover:border-red-400 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center justify-between ">
                <p className="text-xs uppercase tracking-widest font-bold text-red-600">
                  This Month earning
                </p>
                <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">
                  💰
                </span>
              </div>
              <div className="flex items-center gap-3">
                <p className="md:text-4xl text-xl font-black text-gray-900 mb-2 mt-1">
                  {Math.floor(bookingData?.thisMonthEarning) || 0}
                </p>
              </div>
            </div>

            {/* Average Rating */}
            <div className="group bg-gradient-to-br from-white to-red-50 rounded-2xl border border-red-200 p-6 shadow-lg hover:shadow-2xl hover:border-red-400 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs uppercase tracking-widest font-bold text-red-600">
                  Rating
                </p>
                <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                  ⭐
                </span>
              </div>
              <p className="md:text-4xl text-xl font-black text-gray-900 mb-2">
                {Math.floor(bookingData?.rating) || 0}
              </p>
            </div>

            {/* Completed Bookings */}
            <div className="group bg-gradient-to-br from-white to-red-50 rounded-2xl border border-red-200 p-6 shadow-lg hover:shadow-2xl hover:border-red-400 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs uppercase tracking-widest font-bold text-red-600">
                  Completed bookings
                </p>
                <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">
                  ✓
                </span>
              </div>
              <p className=" md:text-4xl text-xl font-black text-gray-900 mb-3">
                {Math.floor(bookingData?.totalCompletedBookings) || 0}
              </p>
            </div>

            {/* Upcoming This Week */}
            <div className="group bg-gradient-to-br from-white to-red-50 rounded-2xl border border-red-200 p-6 shadow-lg hover:shadow-2xl hover:border-red-400 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs uppercase tracking-widest font-bold text-red-600">
                  Upcoming bookings
                </p>
                <span className="text-2xl group-hover:bounce transition-transform duration-300">
                  📅
                </span>
              </div>
              <p className="md:text-4xl text-xl font-black text-gray-900 mb-2">
                {Math.floor(bookingData?.totalUpcomingBookings) || 0}
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="">
            {/* Left Column - Bookings and Reviews */}
            <div className=" space-y-10">
              {/* Upcoming Bookings */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="flex items-center">
                    <div className="w-1.5 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
                    <h2 className="md:text-2xl ml-2 text-sm font-black text-gray-900">
                      UPCOMING BOOKINGS REQUEST
                    </h2>
                  </div>
                  <span className="text-xs bg-red-100 text-red-700 font-bold px-3 py-1 rounded-full">
                    {bookingData?.upcomingBookingsRequestList.length || 0}{' '}
                    REQUEST
                  </span>
                </div>
                <div className="px-1 md:px-0 py-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Bookings Container */}
                    <div className="w-full lg:w-3/4">
                      <div className="overflow-x-auto ">
                        <div className="flex gap-4 md:gap-2  pb-4 min-w-min md:min-w-full">
                          {bookingData?.upcomingBookingsRequestList?.length ===
                          0 ? (
                            <div className=" flex p-4">
                              <div className="">
                                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                  {/* Red header accent */}
                                  <div className="h-2 bg-gradient-to-r from-red-600 to-red-500"></div>

                                  {/* Content */}
                                  <div className="p-8 text-center">
                                    {/* Icon */}
                                    <div className="mb-6 flex justify-center">
                                      <div className="bg-red-50 rounded-full p-4">
                                        <svg
                                          className="w-12 h-12 text-red-600"
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
                                      </div>
                                    </div>

                                    {/* Heading */}
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                      No Upcoming Bookings Request
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-500 mb-6">
                                      You don't have any bookings request at the
                                      moment.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            bookingData?.upcomingBookingsRequestList?.map(
                              (booking) => (
                                <Link
                                  key={booking.bookingId}
                                  href={`/companion/BookingrequestDetail?bookingid=${booking.bookingId}`}
                                >
                                  {' '}
                                  <div className="group bg-white rounded-2xl border border-red-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer flex-shrink-0 w-60 md:w-72">
                                    <div className="h-40 flex items-center justify-center relative overflow-hidden">
                                      {booking?.images && (
                                        <div className="absolute inset-0 transition-opacity duration-300">
                                          <Image
                                            src={
                                              booking?.images?.[0] ||
                                              '/default-booking.jpg'
                                            }
                                            alt="user booking"
                                            className="h-40 w-full object-cover"
                                            width={200}
                                            height={100}
                                          />
                                        </div>
                                      )}
                                    </div>

                                    <div className="p-5">
                                      <div className="flex items-center gap-2 mb-3 text-xs text-gray-600 font-semibold">
                                        <span>📅</span>
                                        <span>
                                          {formatBookingTimingsforUi(
                                            booking.startTime,
                                            booking.endTime
                                          )}
                                        </span>
                                      </div>

                                      <div className="flex items-center  justify-between gap-2 mb-4">
                                        <p className="text-sm font-bold text-gray-900">
                                          {booking.name}, {booking.age}
                                        </p>

                                        <p className="text-base font-black bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent whitespace-nowrap"></p>

                                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 flex-shrink-0">
                                          →
                                        </div>
                                      </div>
                                    </div>
                                  </div>{' '}
                                </Link>
                              )
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Actions */}
                    <div className="w-full lg:w-1/4 ">
                      <div className="flex items-center gap-3 mb-7">
                        <div className="w-1.5 h-6 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
                        <h3 className="text-lg font-black text-gray-900">
                          QUICK ACTIONS
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Link href={'/companion/bookinghistory'}>
                          <div className="group bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl py-6 px-3 font-bold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-2 text-xs shadow-lg">
                            <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                              📅
                            </span>
                            <span className="text-center leading-tight">
                              VIEW
                              <br />
                              ALL BOOKINGS
                            </span>
                          </div>{' '}
                        </Link>
                        <Link href={'/companion/Analysis'}>
                          {' '}
                          <div className="group bg-white text-gray-900 rounded-xl py-6 px-3 font-bold hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-2 text-xs shadow-md">
                            <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                              📊
                            </span>
                            <span className="text-center leading-tight">
                              EARNINGS
                              <br />
                              ANALYTICS
                            </span>
                          </div>{' '}
                        </Link>
                        <Link href={'/companion/chat'}>
                          {' '}
                          <button className="group bg-white text-gray-900 rounded-xl py-6 md:py-6 md:px-12 px-14  font-bold hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-2 text-xs shadow-md">
                            <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                              💬
                            </span>
                            <span className="text-center leading-tight">
                              CHATS
                            </span>
                          </button>{' '}
                        </Link>
                        <Link href={'/companion/profile'}>
                          <button className="group bg-white text-gray-900 rounded-xl py-4 px-12 font-bold hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-2 text-xs shadow-md">
                            <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                              ✏️
                            </span>
                            <span className="text-center leading-tight">
                              EDIT
                              <br />
                              PROFILE
                            </span>
                          </button>{' '}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Reviews */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
