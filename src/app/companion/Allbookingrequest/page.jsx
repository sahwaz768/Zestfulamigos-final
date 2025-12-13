'use client';
import React from 'react';
import Chatheader from '@/components/Masterheader';
import Notify from '@/components/Notify';
import { Mastersidebar } from '@/components/MasterSidebar';
import Image from 'next/image';
import UserProfile from '@/shared/Assets/Femalegender.svg';
import Link from 'next/link';

const page = () => {
  return (
    <div className="min-h-screen ">
      <Chatheader backgroundColor="rgba(250, 236, 236, 0.8)" />
      <div className="notifymbsecond">
        <Notify backgroundColor="transparent" color="black" />
      </div>
      <Mastersidebar className="sbar-height-chat" />
      
      <div className="max-w-6xl mx-auto px-4 pt-4 md:pt-10">
        {/* Header Section */}
        <div className="mb-3">
          <div className="inline-flex items-center bg-white   pb-1 rounded-full">
            
            <h1 className="font-black text-2xl text-black bg-clip-text">
              Booking Requests
            </h1>
          </div>
          <p className="text-sm mt-2 text-gray-600 max-w-2xl leading-relaxed">Manage your upcoming bookings</p>
        </div>

        {/* Booking Cards Container */}
        <div className="space-y-6">
          {/* First Booking Card */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-rose-100 overflow-hidden">
            <div className="p-3 md:p-2 md:px-5">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Profile Image */}
                <div className="relative shrink-0">
                  <div className="w-12 h-12 md:w-22 md:h-22 rounded-2xl overflow-hidden ring-4 ring-rose-100 group-hover:ring-rose-200 transition-all duration-300">
                    <Image
                      src={UserProfile}
                      alt="Alex Parker Profile"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                </div>

                {/* User Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl md:text-xl font-bold text-gray-800">Alex Parker</h3>
                    <span className="px-3 py-1 bg-linear-to-r from-blue-100 to-blue-200 text-blue-700 text-xs font-medium rounded-full">
                      New Request
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span className="font-medium text-sm">7 Sept</span>
                    <span className="mx-2">•</span>
                    <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="font-medium text-sm">1:00 PM - 3:00 PM</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span className='text-xs'>2 hours duration</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="w-full md:w-auto">
                  <Link href={'/companion/BookingrequestDetail'}>
                    <button className="w-full md:w-auto bg-linear-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-rose-200">
                      Check Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          
          
        </div>

        {/* Empty State or Load More */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-rose-100 to-pink-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
          <p className="text-gray-500 text-lg">No more booking requests</p>
          <p className="text-gray-400 text-sm mt-1">New requests will appear here automatically</p>
        </div>
      </div>
    </div>
  );
};

export default page;
