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

const Page = () => {
  const userDetails = useSelector((state) => state.AuthReducer.data);
  const [bookingData, setBookingData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [lastrate, setlastrate] = useState();

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
    console.log('userDetail', userDetails);
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
      <div className="min-h-screen  relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="notifymbsecond">
          <Notify backgroundColor="transparent" color="black" />
        </div>
        <div>
          <Mastersidebar isCompanion={true} className="sbar-height" />
        </div>

        <div className="md:w-[75rem] w-[95%] mx-auto px-6 py-8 relative z-10">
          {/* Header Profile Section */}
          <div className=" rounded-3xl border border-red-200 p-8 mb-10 shadow-lg hover:shadow-xl transition-all  bg-opacity-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="relative group">
                  <div className="absolute inset-0  rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Image
                    src={Couple}
                    width={15}
                    height={15}
                    className="w-28 h-24 rounded-full "
                    alt="profile picture"
                  />
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-lg animate-pulse"></div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-3xl font-black bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                      {userDetails.name}
                    </h1>
                    <span className="w-3 h-3 bg-green-500 rounded-full shadow-lg animate-pulse"></span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl px-6 py-4 border border-red-200 hover:border-red-300 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <p className="text-xs text-black font-bold uppercase tracking-wider">
                    Withdrawable Balance
                  </p>
                  <p className="text-xl font-black bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                    $5,430
                  </p>
                </div>
                <span className="text-red-600 text-xl group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </div>
            </div>
          </div>

          {/* Stats Cards with Enhanced Design */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
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
                <p className="text-4xl font-black text-gray-900 mb-2">
                  $18,450
                </p>
                <span className="text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                  ↑
                </span>
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
              <p className="text-3xl font-black text-gray-900 mb-2">4.97</p>
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
              <p className="text-3xl font-black text-gray-900 mb-3">24</p>
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
              <p className="text-4xl font-black text-gray-900 mb-2">5</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className=" gap-8">
            {/* Left Column - Bookings and Reviews */}
            <div className="flex flex-wrap space-y-10">
              {/* Upcoming Bookings */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
                  <h2 className="text-2xl font-black text-gray-900">
                    UPCOMING BOOKINGS
                  </h2>
                  <span className="text-xs bg-red-100 text-red-700 font-bold px-3 py-1 rounded-full">
                    5 Bookings
                  </span>
                </div>
                <div className='flex md:justify-between items-center gap-8'>
                <div className="grid grid-cols-3 gap-10">
                  {/* Booking 1 */}
                  <div className="group bg-white rounded-2xl border border-red-200 overflow-hidden shadow-lg hover:shadow-2xl  transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                    <div className="h-40  flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0   transition-opacity duration-300">
                        {' '}
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvUhQvoTaGpcz0RVO8vXqlhFFE7GUQd5dwUw&s"
                          alt="userimages"
                          className="h-40 w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3 text-xs text-gray-600 font-semibold">
                        <span>📅</span>
                        <span>Oct 26, 2025 • 7:00 PM-8.00 PM</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <p className="text-sm font-bold text-gray-900">
                          Alex bannar
                        </p>
                        <p className="text-2xl font-black bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                          $1,200
                        </p>
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                          →
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booking 2 */}
                  <div className="group bg-white rounded-2xl border border-red-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                    <div className="h-40  flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0   transition-opacity duration-300">
                        {' '}
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvUhQvoTaGpcz0RVO8vXqlhFFE7GUQd5dwUw&s"
                          alt="userimages"
                          className="h-40 w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3 text-xs text-gray-600 font-semibold">
                        <span>📅</span>
                        <span>Oct 26, 2025 • 7:00 PM-8.00 PM</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <p className="text-sm font-bold text-gray-900">
                          Alex bannar
                        </p>
                        <p className="text-2xl font-black bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                          $1,200
                        </p>
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                          →
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booking 3 */}
                  <div className="group bg-white rounded-2xl border border-red-200 overflow-hidden shadow-lg hover:shadow-2xl  transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                    <div className="h-40  flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0   transition-opacity duration-300">
                        {' '}
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvUhQvoTaGpcz0RVO8vXqlhFFE7GUQd5dwUw&s"
                          alt="userimages"
                          className="h-40 w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3 text-xs text-gray-600 font-semibold">
                        <span>📅</span>
                        <span>Oct 26, 2025 • 7:00 PM-8.00 PM</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <p className="text-sm font-bold text-gray-900">
                          Alex bannar
                        </p>
                        <p className="text-2xl font-black bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                          $1,200
                        </p>
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                          →
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                 {/* Right Column - Actions and Chart */}
              <div className="space-y-6">
                {/* Action Buttons */}
                <div>
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-1.5 h-6 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
                    <h3 className="text-lg font-black text-gray-900">
                      QUICK ACTIONS
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="group  text-black rounded-xl py-6 px-3 font-bold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-2 text-xs shadow-lg hover:from-red-600 hover:to-red-700">
                      <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                        📅
                      </span>
                      <span className="text-center leading-tight">
                        VIEW
                        <br />
                        ALL BOOKINGS
                      </span>
                    </button>
                    <button className="group bg-white  text-gray-900 rounded-xl py-6 px-3 font-bold  hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-2 text-xs">
                      <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                        📊
                      </span>
                      <span className="text-center leading-tight">
                        EARNINGS
                        <br />
                        ANALYTICS
                      </span>
                    </button>
                    <button className="group bg-white  text-gray-900 rounded-xl py-6 px-3 font-bold  hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-2 text-xs">
                      <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                        🛡️
                      </span>
                      <span className="text-center leading-tight">
                        SAFETY
                        <br />
                        CENTER
                      </span>
                    </button>
                    <button className="group bg-white  text-gray-900 rounded-xl py-6 px-3 font-bold  hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-2 text-xs">
                      <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                        ✏️
                      </span>
                      <span className="text-center leading-tight">
                        EDIT
                        <br />
                        PROFILE
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              </div>

             
              </div>


              {/* Recent Reviews */}
              
            </div>
            <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
                  <h2 className="text-2xl font-black text-gray-900">
                    RECENT REVIEWS
                  </h2>
                </div>
                <div className="grid grid-cols-4 gap-5">
                  {/* Review 1 */}
                  <div className="group bg-white rounded-2xl border border-red-200 p-6 shadow-lg hover:shadow-2xl hover:border-red-400 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className="text-yellow-400 text-lg group-hover:scale-110 transition-transform duration-300"
                          style={{ transitionDelay: `${i * 50}ms` }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-800 font-semibold mb-4 leading-relaxed">
                      "Absolutely incredible experience. Sophia is charming and
                      professional."
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-red-100">
                      <p className="text-xs font-bold text-gray-900">- J.D.</p>
                      <span className="text-xs text-gray-600">2 days ago</span>
                    </div>
                  </div>

                  {/* Review 2 */}
                  <div className="group bg-white rounded-2xl border border-red-200 p-6 shadow-lg hover:shadow-2xl hover:border-red-400 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className="text-yellow-400 text-lg group-hover:scale-110 transition-transform duration-300"
                          style={{ transitionDelay: `${i * 50}ms` }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-800 font-semibold mb-4 leading-relaxed">
                      "Best companion I've ever met. Highly recommended for
                      anyone!"
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-red-100">
                      <p className="text-xs font-bold text-gray-900">- M.R.</p>
                      <span className="text-xs text-gray-600">1 week ago</span>
                    </div>
                  </div>

                  {/* Review 3 */}
                  <div className="group bg-white rounded-2xl border border-red-200 p-6 shadow-lg hover:shadow-2xl hover:border-red-400 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className="text-yellow-400 text-lg group-hover:scale-110 transition-transform duration-300"
                          style={{ transitionDelay: `${i * 50}ms` }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-800 font-semibold mb-4 leading-relaxed">
                      "A perfect evening. Sophia exceeded all expectations!"
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-red-100">
                      <p className="text-xs font-bold text-gray-900">- A.K.</p>
                      <span className="text-xs text-gray-600">3 days ago</span>
                    </div>
                  </div>

                  <div className="group bg-white rounded-2xl border border-red-200 p-6 shadow-lg hover:shadow-2xl hover:border-red-400 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className="text-yellow-400 text-lg group-hover:scale-110 transition-transform duration-300"
                          style={{ transitionDelay: `${i * 50}ms` }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-800 font-semibold mb-4 leading-relaxed">
                      "A perfect evening. Sophia exceeded all expectations!"
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-red-100">
                      <p className="text-xs font-bold text-gray-900">- A.K.</p>
                      <span className="text-xs text-gray-600">3 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
