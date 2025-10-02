import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import UserProfile from '@/shared/Assets/Femalegender.svg';

const PendingEarnings = (initialData = {}) => {
  const [bookingData, SetbookingData] = useState({});

  useEffect(() => {
    console.log('Initial pending Data:', initialData);
    SetbookingData(initialData.initialData);
  }, []);

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-2 sm:p-4 space-y-3 sm:space-y-4">
          {Array.isArray(bookingData) &&
            bookingData.map((item, index) => (
              <div
                key={index}
                className="group bg-white hover:bg-gradient-to-br hover:from-rose-50 hover:via-white hover:to-pink-50 rounded-xl py-3 px-3 sm:py-1 sm:px-6 transition-all duration-300 border border-gray-200 hover:border-rose-300 hover:shadow-xl"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
                  {/* Left Section */}
                  <div className="flex-1 space-y-3 sm:space-y-4 w-full">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 mt-1 sm:mt-2 group-hover:text-rose-700 transition-colors duration-200 break-words">
                        Transaction ID: {item.txnId || 'alex parker'}
                      </h3>

                      <div className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-0 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                        TRANSACTION: {item.transactionStatus || 'PENDING'}
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 text-sm text-gray-600 mb-3 sm:mb-4">
                        <div className='flex items-center gap-2'>
                          <svg
                            className="w-4 h-4 text-gray-400 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="font-medium">Platform Fee:</span>
                          <span className="text-gray-900">
                            ₹{Math.floor(item.platformFee)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg
                            className="w-4 h-4 text-gray-400 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="font-medium">Tax Amount:</span>
                          <span className="text-gray-900">
                            ₹{Math.floor(item.taxAmount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="lg:text-right space-y-2 w-full lg:w-auto">
                    <div className="flex items-center gap-3 justify-start lg:justify-end">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200 flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-white"
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
                     
                      <div className="flex flex-col items-start lg:items-end">
                        <h3 className="text-xl sm:text-2xl font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors duration-200">
                          +₹{Math.floor(item.netAmount)}
                        </h3>
                        <h1 className='text-xs sm:text-sm text-gray-600'>Net Amount Earned</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PendingEarnings;