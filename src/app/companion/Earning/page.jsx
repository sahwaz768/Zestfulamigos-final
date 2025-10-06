'use client';
import { useState, useEffect } from 'react';
import Chatheader from '@/components/Masterheader';
import Notify from '@/components/Notify';
import { Mastersidebar } from '@/components/MasterSidebar';
import PendingEarnings from '@/components/pendingEarnings';
import Pagination from '@/components/Pagination';

const Page = () => {
  const [PendingData, setPendingData] = useState({});
  const [CompletedData, setCompletedData] = useState({});
  const [activeTab, SetActiveTab] = useState('pending');

  useEffect(() => {
    const fetchPendingEarningData = async () => {
      try {
        const { getCompanionPendingEarnings } = await import(
          '@/services/user/bookings.service'
        );
        const result = await getCompanionPendingEarnings();
        if (result) {
          setPendingData(result.data.data);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchPendingEarningData();
    const fetchCompletedEarningData = async () => {
      try {
        const { getCompanionCompletedEarnings } = await import(
          '@/services/user/bookings.service'
        );
        const result = await getCompanionCompletedEarnings();
        if (result) {
          setCompletedData(result.data.data);
          console.log('Completed Earnings Data:', result.data.data);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchCompletedEarningData();
  }, []);

  const onPageChange = async (pageNo) => {
    const values = {
      pageNo
    };
    try {
      const { getCompanionPendingEarnings } = await import(
        '@/services/user/bookings.service'
      );
      const result = await getCompanionPendingEarnings(values);
      setPendingData(result.data.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

    const onPage = async (pageNo) => {
    const values = {
      pageNo
    };
    try {
      const { getCompanionCompletedEarnings } = await import(
        '@/services/user/bookings.service'
      );
      const result = await getCompanionCompletedEarnings(values);
      CompletedData(result.data.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

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
                  onChange={(e) => SetActiveTab(e.target.value)}
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
          {/* pending Earnings */}
          {Object.keys(PendingData).length > 0 && activeTab === 'pending' && (
            <PendingEarnings initialData={PendingData.earnings} />
          )}
          {PendingData && activeTab === 'pending' && (
            <Pagination
              currentPage={PendingData.currentPage}
              totalPage={PendingData.totalPages}
              onPageChange={onPageChange}
            />
          )}
          {Object.keys(CompletedData).length > 0 &&
            activeTab === 'completed' && (
              <PendingEarnings initialData={CompletedData.earnings} />
            )}
             {CompletedData && activeTab === 'completed' && (
            <Pagination
              currentPage={CompletedData.currentPage}
              totalPage={CompletedData.totalPages}
              onPageChange={onPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
