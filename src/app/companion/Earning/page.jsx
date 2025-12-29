'use client';
import { useState, useEffect } from 'react';
import Chatheader from '@/components/Masterheader';
import Notify from '@/components/Notify';
import { Mastersidebar } from '@/components/MasterSidebar';
import PendingEarnings from '@/components/pendingEarnings';
import Pagination from '@/components/Pagination';
import Loadingbar from '@/components/Loadingbar';

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
          console.log('Pending Earnings Data:', result.data.data);
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
      setCompletedData(result.data.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  if (!PendingData && !CompletedData) {
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

      <div className="min-h-screen  py-8 ">
        <div className="max-w-7xl mx-auto p-1 md:px-4">
          {/* Header Section */}
          <div className="bg-white  px-8 mb-2 mt-4 ">
            <div className="flex  justify-between  gap-6">
              <div>
                <h1 className="font-black md:text-2xl text-lg text-black bg-clip-text">
                  Transaction:
                </h1>
                <p className="md:text-sm text-xs  mt-2 text-gray-600 max-w-2xl leading-relaxed">
                  Track your earnings and payment history
                </p>
              </div>

              <div className="relative">
                <select
                  className="w-full px-4 py-3 bg-red-400 text-white font-medium border-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:scale-105 cursor-pointer focus:bg-red-700"
                  onChange={(e) => SetActiveTab(e.target.value)}
                >
                  <option value="pending" className=" bg-white text-gray-800">
                    PENDING
                  </option>
                  <option value="completed" className=" bg-white text-gray-800">
                    COMPLETED
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                 
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
