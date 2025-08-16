'use client';
import React from 'react';
import Image from 'next/image';
import Chatheader from '@/components/Masterheader';
import Notify from '@/components/Notify';
import { Mastersidebar } from '@/components/MasterSidebar';
import Profilepicture from '@/shared/Assets/Rectangle 10.png';


const page = () => {
  return (
    <>
      <Chatheader backgroundColor="rgba(250, 236, 236, 0.8)" />
      <div className="notifymbsecond">
        <Notify backgroundColor="transparent" color="black" />
      </div>
      <Mastersidebar className="sbar-height-chat" />
      
      <div className="md:w-[75rem] w-[95%] mx-auto md:my-5 my-10 p-8 bg-gradient-to-br from-white via-pink-50 to-purple-50 rounded-2xl shadow-2xl border border-pink-100">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="font-black text-4xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            User Analytics Dashboard
          </h1>
          <p className="text-sm mt-4 text-gray-600 max-w-2xl leading-relaxed">
            Zestful Amigos connects companions and clients across major cities. 
            The insights below reflect companion performance, ratings, and earnings analytics.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Stats Card */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-white to-pink-50 p-8 border border-pink-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
            
            <div className="relative grid grid-cols-2 gap-6 h-full">
              {/* Total Booking */}
              <div className="flex flex-col justify-center items-center text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-pink-100">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-3xl">⏰</span>
                </div>
                <h3 className="text-4xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  76<span className="text-xl">Hr</span>
                </h3>
                <p className="text-sm text-gray-600 font-medium mt-2">Total Booking</p>
              </div>

              {/* Average Rating */}
              <div className="flex flex-col justify-center items-center text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-purple-100">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-3xl">⭐</span>
                </div>
                <h3 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  4.2
                </h3>
                <p className="text-sm text-gray-600 font-medium mt-2">Average Rating</p>
              </div>

              {/* Total Earned */}
              <div className="flex flex-col justify-center items-center text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-green-100">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-3xl">💰</span>
                </div>
                <h3 className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  10k
                </h3>
                <p className="text-sm text-gray-600 font-medium mt-2">Total Earned</p>
              </div>

              {/* Last Week Earned */}
              <div className="flex flex-col justify-center items-center text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-orange-100">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-3xl">📈</span>
                </div>
                <h3 className="text-4xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  5.2k
                </h3>
                <p className="text-sm text-gray-600 font-medium mt-2">Last Week Earned</p>
              </div>
            </div>
          </div>

          {/* Recent Earnings Card */}
          <div className="bg-gradient-to-br from-white to-purple-50 p-8 border border-purple-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-xl">👥</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Recent Earnings</h3>
            </div>

            <div className="space-y-4">
              {/* Earning Item 1 */}
              <div className="group flex justify-between items-center p-4 bg-white/80 rounded-2xl border border-purple-100 hover:bg-white hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Image 
                      src={Profilepicture} 
                      alt="Profile Picture" 
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-200"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Alisha Parker</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs">📅</span>
                      <p className="text-xs text-gray-500">12 July: 10:00 AM - 11:00 AM</p>
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
                  <div className="relative">
                    <Image 
                      src={Profilepicture} 
                      alt="Profile Picture" 
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-200"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Alisha Parker</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs">📅</span>
                      <p className="text-xs text-gray-500">12 July: 10:00 AM - 11:00 AM</p>
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
              <button className="w-full mt-4 py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
                View All Earnings
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Chart Section */}
        <div className="bg-gradient-to-br from-white to-gray-50 p-8 border border-gray-200 rounded-3xl shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Performance Analytics</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-purple-500 text-white rounded-xl text-sm font-medium hover:bg-purple-600 transition-colors">
                Weekly
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-300 transition-colors">
                Monthly
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-300 transition-colors">
                Yearly
              </button>
            </div>
          </div>
          
          {/* Placeholder for Chart */}
          <div className="h-80 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-dashed border-purple-200 flex items-center justify-center">
            <div className="text-center">
              <span className="text-6xl block mb-4">📊</span>
              <p className="text-xl font-semibold text-purple-600 mb-2">Chart Integration</p>
              <p className="text-gray-500">Connect your analytics chart component here</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
