'use client';
import React from 'react';
import Image from 'next/image';
import Chatheader from '@/components/Masterheader';
import Notify from '@/components/Notify';
import { Mastersidebar } from '@/components/MasterSidebar';
import Profilepicture from '@/shared/Assets/Rectangle 10.png';
import { useEffect, useState } from 'react';
import Loadingbar from '@/components/Loadingbar';
import { formatBookingTimingsforUi } from '@/utils/bookings.utils';
import Link from 'next/link';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

const page = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [recentEarnings, setrecentEarning] = useState([]);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const { getCompanionAnalysisDetails } = await import(
          '@/services/user/bookings.service'
        );
        const result = await getCompanionAnalysisDetails();

        if (result.data) {
          setrecentEarning(result.data.data.recent_earnings);
          console.log('recent earning', result.data.data.recent_earnings);

          setAnalysisData(result.data.data);
          const formatted = result.data.data.earnings_last_week_by_days.map(
            (item) => ({
              Days: item.day.slice(0, 3),
              Hours: item.hours
            })
          );
          setChartData(formatted);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchAnalysisData();
  }, []);

  if (!analysisData) {
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

      <div className="md:w-[75rem] w-[100%] mx-auto md:my-5 my-10 p-8  rounded-2xl shadow-sm">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="font-black text-4xl text-black bg-clip-text ">
            Your Insights
          </h1>
          <p className="text-sm mt-4 text-gray-600 max-w-2xl leading-relaxed">
            "Comprehensive overview of your performance, client ratings, and
            earnings"
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Stats Card */}
          <div className="group relative overflow-hidden bg-gradient-to-br p-8 border border-gray rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 ">
            <div className="relative grid grid-cols-2 gap-6 h-full">
              {/* Total Booking */}
              <div className="flex flex-col justify-center items-center text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-pink-100">
                <div className="w-16 h-16 bg-gradient-to-br   rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-3xl">⏰</span>
                </div>
                <h3 className="text-4xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  {analysisData?.total_booking_hours ?? 0}
                  <span className="text-xl">Hr</span>
                </h3>
                <p className="text-sm text-gray-600 font-medium mt-2">
                  Total Booking
                </p>
              </div>

              {/* Average Rating */}
              <div className="flex flex-col justify-center items-center text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-purple-100">
                <div className="w-16 h-16 bg-gradient-to-br rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-3xl">⭐</span>
                </div>
                <h3 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {analysisData?.average_rating ?? 'N/A'}
                </h3>
                <p className="text-sm text-gray-600 font-medium mt-2">
                  Average Rating
                </p>
              </div>

              {/* Total Earned */}
              <div className="flex flex-col justify-center items-center text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-green-100">
                <div className="w-16 h-16 bg-gradient-to-br rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-3xl">💰</span>
                </div>
                <h3 className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {Math.floor(analysisData?.total_earning ?? 0)}
                </h3>
                <p className="text-sm text-gray-600 font-medium mt-2">
                  Total Earned
                </p>
              </div>

              {/* Last Week Earned */}
              <div className="flex flex-col justify-center items-center text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-orange-100">
                <div className="w-16 h-16 bg-gradient-to-br rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-3xl">📈</span>
                </div>
                <h3 className="text-4xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {Math.floor(analysisData?.last_week_earning ?? 0)}
                </h3>
                <p className="text-sm text-gray-600 font-medium mt-2">
                  Last Week Earned
                </p>
              </div>

              {/* Pending amount */}
              <div className="flex flex-col justify-center items-center text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-orange-100">
                <div className="w-16 h-16 bg-gradient-to-br rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-3xl">⏳</span>
                </div>
                <h3 className="text-4xl font-black bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  {Math.floor(analysisData?.pending_amount ?? 0)}
                </h3>
                <p className="text-sm text-gray-600 font-medium mt-2">
                  Pending amount
                </p>
              </div>
              <div className="flex flex-col justify-center items-center text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-orange-100">
                <div className="w-16 h-16 bg-gradient-to-br rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-3xl">🚩</span>
                </div>
                <h3 className="text-4xl font-black bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                  {Math.floor(analysisData?.penalty_charges ?? 0)}
                </h3>
                <p className="text-sm text-gray-600 font-medium mt-2">
                  panelty charged
                </p>
              </div>
            </div>
          </div>

          {/* Recent Earnings Card */}
          <div className="bg-white p-8 border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-auto">
            <div className="flex items-center justify-between mb-3 pb-4 border-b border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-900">
                Recent Earnings
              </h3>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-700">
                  TRANSACTION: COMPLETED
                </span>
              </div>
            </div>

            <div className="space-y-4 h-4/5">
              {recentEarnings.map((item, index) => (
                <div
                  className="group p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-red-50 transition-all duration-200"
                  key={index}
                >
                  <div className="flex justify-between items-start">
                    <div className="">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-gray-500">
                          Transaction ID
                        </p>
                        <span className="text-sm font-semibold text-gray-900">
                          {item.txn_id}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-2 h-2 text-purple-600"
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
                        <p className="text-sm text-gray-700">
                          {formatBookingTimingsforUi(
                            item.booking_start,
                            item.booking_end
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="text-right ml-6 pl-2 border-l border-gray-200">
                      <div className="bg-green-50 rounded-xl px-2 py-1 border border-green-200">
                        <span className="text-lg font-bold text-green-600">
                          + ₹{Math.floor(item.amount)}
                        </span>
                        <p className="text-xs text-gray-600 font-medium mt-1.5">
                          Earned amount
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex gap-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-orange-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-700">
                          Platform fee:₹
                          <span className="font-semibold text-gray-900">
                          {Math.floor(item.platform_fee)}
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-700">
                          Tax Amount:₹
                          <span className="font-semibold text-gray-900">
                            {Math.floor(item.tax_amount)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* View All Button */}
            </div>
            <Link href={'/companion/Earning'}>
              {' '}
              <button className="w-full mt-10 py-3.5 px-6 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 bottom-0">
                <span>View All Earnings</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* Analytics Chart Section */}
        <div className="bg-white p-6 border border-pink-100 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              Performance Analytics
            </h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-lg text-sm font-medium">
                Weekly
              </button>
            </div>
          </div>

          {/* Placeholder for Chart */}
          <div className="">
            <div>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Days" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="Hours" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
