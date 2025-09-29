'use client';
import React from 'react';
import Image from 'next/image';
import Chatheader from '@/components/Masterheader';
import Notify from '@/components/Notify';
import { Mastersidebar } from '@/components/MasterSidebar';
import Profilepicture from '@/shared/Assets/Rectangle 10.png';
import { useEffect, useState } from 'react';
import Loadingbar from '@/components/Loadingbar';
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

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const { getCompanionAnalysisDetails } = await import(
          '@/services/user/bookings.service'
        );
        const result = await getCompanionAnalysisDetails();

        if (result.data) {
          console.log(result.data.data);
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


   if(!analysisData){
      return <div><Loadingbar/></div>
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
           "Comprehensive overview of your performance, client ratings, and earnings"
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
                  {analysisData?.total_earning ?? 0}
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
                  {analysisData?.last_week_earning ?? 0}
                </h3>
                <p className="text-sm text-gray-600 font-medium mt-2">
                  Last Week Earned
                </p>
              </div>
            </div>
          </div>

          {/* Recent Earnings Card */}
          <div className="bg-gradient-to-br from-white to-purple-50 p-8 border border-purple-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Recent Earnings
              </h3>
            </div>

            <div className="space-y-4">
              {/* Earning Item 1 */}
              <div className="group flex justify-between items-center p-4 bg-white/80 rounded-2xl border border-purple-100 hover:bg-white hover:shadow-md transition-all duration-200 ">
                <div className="flex items-center gap-4">
                  <Image
                    src={Profilepicture}
                    alt="Profile Picture"
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-200"
                  />
                  <div>
                    <p className="font-bold text-gray-800">Alisha Parker</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs">📅</span>
                      <p className="text-xs text-gray-500">
                        12 July: 10:00 AM - 11:00 AM
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-green-600 group-hover:text-green-700 transition-colors">
                    +₹8,000
                  </span>
                  <p className="text-xs text-gray-500 mt-1">1 hour session</p>
                </div>
              </div>

              {/* Earning Item 2 */}
              <div className="group flex justify-between items-center p-4 bg-white/80 rounded-2xl border border-purple-100 hover:bg-white hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-4">
                  <Image
                    src={Profilepicture}
                    alt="Profile Picture"
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-200"
                  />
                  <div>
                    <p className="font-bold text-gray-800">Alisha Parker</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs">📅</span>
                      <p className="text-xs text-gray-500">
                        12 July: 10:00 AM - 11:00 AM
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-green-600 group-hover:text-green-700 transition-colors">
                    +₹8,000
                  </span>
                  <p className="text-xs text-gray-500 mt-1">1 hour session</p>
                </div>
              </div>
              <div className="group flex justify-between items-center p-4 bg-white/80 rounded-2xl border border-purple-100 hover:bg-white hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-4">
                  <Image
                    src={Profilepicture}
                    alt="Profile Picture"
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-200"
                  />
                  <div>
                    <p className="font-bold text-gray-800">Alisha Parker</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs">📅</span>
                      <p className="text-xs text-gray-500">
                        12 July: 10:00 AM - 11:00 AM
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-green-600 group-hover:text-green-700 transition-colors">
                    +₹8,000
                  </span>
                  <p className="text-xs text-gray-500 mt-1">1 hour session</p>
                </div>
              </div>

              {/* View All Button */}
              <button className="w-full mt-4 py-3 px-6 bg-gradient-to-r from-red-400 to-red-500 text-white font-semibold rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-200">
                View All Earnings
              </button>
            </div>
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
