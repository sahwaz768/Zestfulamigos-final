import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import UserProfile from '@/shared/Assets/Femalegender.svg';
import { formatBookingTimingsforUi } from '@/utils/bookings.utils';

const PendingEarnings = ({ initialData = [] }) => {
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    setBookingData(initialData || []);
  }, [initialData]);

  return (
    <div className="w-full ml-0 md:ml-4">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-2 sm:p-4 space-y-3 sm:space-y-4">
          {Array.isArray(bookingData) && bookingData.length > 0 ? (
            bookingData.map((item, index) => (
              <div
                key={index}
                className="group bg-white hover:bg-gradient-to-br hover:from-rose-50 hover:via-white hover:to-pink-50 rounded-xl py-3 px-3 sm:py-1 sm:px-6 transition-all duration-300 border border-gray-200 hover:border-rose-300 hover:shadow-xl"
              >
                <div className="flex justify-between gap-4 mb-2 sm:gap-6">
                  {/* Left Section */}
                  <div className="space-y-3 sm:space-y-4 w-full">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 mt-1 group-hover:text-rose-700 transition-colors duration-200 break-words">
                        Transaction ID: {item.txnId || 'alex parker'}
                      </h3>

                      <div
                        className={`${
                          item.status === 'COMPLETED'
                            ? 'text-green-700 bg-green-50 border-green-200'
                            : 'text-red-700 bg-red-50 border-red-200'
                        } inline-flex items-center px-3 sm:px-4 py-1 sm:py-0 rounded-full text-xs font-medium border`}
                      >
                        <span
                          className={`w-2 h-2 ${
                            item.status === 'COMPLETED'
                              ? 'bg-green-500'
                              : 'bg-red-500'
                          } rounded-full mr-2 animate-pulse`}
                        ></span>
                        TRANSACTION: {item.status}
                      </div>
                    </div>

                    {/* Transaction details */}
                    <div className="flex flex-col  sm:flex-row sm:items-center gap-1 md:gap-3 sm:gap-5 text-sm text-gray-600  sm:mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Platform Fee:</span>
                        <span className="text-gray-900">
                          ₹{Math.floor(item.platformFee)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">Tax Amount:</span>
                        <span className="text-gray-900">
                          ₹{Math.floor(item.taxAmount)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">Penalty charged:</span>
                        <span className="text-gray-900">
                          ₹{Math.floor(item.penaltyAmount)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="lg:text-right space-y-2 w-full lg:w-auto mt-5">
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
                        <h1 className="text-xs sm:text-sm text-gray-600">
                          Net Amount Earned
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-medium text-slate-500 text-sm">
                    Booking time and date:
                  </span>
                  <span className="text-gray-900 text-sm">
                    {formatBookingTimingsforUi(
                      item?.Booking.bookingstart,
                      item?.Booking.bookingend
                    )}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Sorry, no data found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingEarnings;
