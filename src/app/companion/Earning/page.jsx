'use client';
import { useState } from 'react';
import Chatheader from '@/components/Masterheader';
import Notify from '@/components/Notify';
import { Mastersidebar } from '@/components/MasterSidebar';
import Image from 'next/image';
import UserProfile from '@/shared/Assets/Femalegender.svg';

const page = () => {
  const [filter, setFilter] = useState('pending');
  const bookingsData = [
    {
      id: 1,
      name: 'Alex Parker',
      date: '12th Jan 2024',
      time: '3:00 PM - 5:00 PM',
      amount: 200,
      duration: '2 hours session',
      status: 'completed'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      date: '10th Jan 2024',
      time: '1:00 PM - 2:30 PM',
      amount: 125,
      duration: '1.5 hours session',
      status: 'pending'
    }
  ];

  const bookingfilter = bookingsData.filter(
    (booking) => booking.status === filter
  );

  return (
    <>
      <Chatheader backgroundColor="rgba(250, 236, 236, 0.8)" />
      <div className="notifymbsecond">
        <Notify backgroundColor="transparent" color="black" />
      </div>
      <Mastersidebar className="sbar-height-chat" />

      <div className="min-h-screen  py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="bg-white  px-8 mb-2 ">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <h1 className="font-black text-2xl text-black bg-clip-text">
                  All Earnings
                </h1>
                <p className="text-sm mt-2 text-gray-600 max-w-2xl leading-relaxed">
                  Track your earnings and payment history
                </p>
              </div>

              <div className="relative">
                <select
                  className="appearance-none bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 pr-10 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-rose-200 cursor-pointer"
                  
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  
                  <option value="pending" className="bg-white text-gray-800">
                    transactions pending
                  </option>
                  <option value="completed" className="bg-white text-gray-800">
                    transactions completed
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Earnings List */}
          <div className="bg-white  overflow-hidden">
            <div className="p-2">
              {/* Earning Item */}
              {bookingfilter.map((booking) => (
                <div
                  className="group hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 rounded-2xl p-2 transition-all duration-300 border-2 border-transparent hover:border-rose-200 hover:shadow-lg"
                  key={booking.id}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-6 flex-1">
                      {/* Profile Image */}
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-rose-200 group-hover:ring-rose-300 transition-all duration-300 shadow-lg">
                          <Image
                            src={UserProfile}
                            alt="Alex Parker Profile"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-3 border-white flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* User Details */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-rose-600 transition-colors">
                          {booking.name}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-rose-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="font-medium text-sm">
                              {booking.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-blue-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="font-medium text-sm">
                              {booking.time}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                            Booking :{booking.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Earning Amount */}
                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-end mb-1">
                        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                          +${booking.amount}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 font-medium">
                        {booking.duration} session
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Additional earning items can be added here */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
