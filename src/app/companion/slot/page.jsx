'use client';
import React, { useEffect, useState } from 'react';
import Chatheader from '@/components/Masterheader';
import Notify from '@/components/Notify';
import { Mastersidebar } from '@/components/MasterSidebar';
import { Calendar } from '@/components/Calender';
import WeeklyScheduler from '@/components/Weeklyslote';
import { convertSlotsToSchedule } from '@/utils/bookings.utils';
import { ScheduleToSlots } from '@/utils/bookings.utils';
import { formatUnixMillisToDate } from '@/utils/bookings.utils';

const Page = () => {
  const [selectedRange, setSelectedRange] = useState(null);
  const [slotSelected, setslotSelected] = useState(null);
  const [weeklySlot, setWeeklySlot] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isOn, setIsOn] = useState(false);

  const handleCalendarSubmit = (data) => {
    setSelectedRange(data);
  };

  const handleslotselected = (data) => {
    setslotSelected(data);
  };

  useEffect(() => {
    const init = async () => {
      const { getEnableSlotService } = await import(
        '@/services/user/slot.service'
      );

      try {
        const data = await getEnableSlotService();
        if (data) {
          console.log('slot data fetched:', data);
          const weeklySchedule = ScheduleToSlots(
            data.data.CompanionAvailability.availabletimeslot
          );
          setWeeklySlot(weeklySchedule);
          const numStartDate = Number(
            data.data.CompanionAvailability.startDate
          );
          const numEndDate = Number(data.data.CompanionAvailability.endDate);
          const formattedStartDate = formatUnixMillisToDate(numStartDate);
          const formattedEndDate = formatUnixMillisToDate(numEndDate);

          setStartDate(formattedStartDate);
          setEndDate(formattedEndDate);
        }
      } catch (error) {
        console.log('error fetching slot data:', error);
      }
    };
    init();
  }, []);

  const handleFinalSubmit = async () => {
    const { toast } = await import('@/utils/reduxtrigger.utils');
    const formatedstartDate = new Date(selectedRange.startDate).getTime();
    const formatedendDate = new Date(selectedRange.endDate).getTime();

    const weeklySchedule = convertSlotsToSchedule(slotSelected);
    if (formatedstartDate == 0 || formatedendDate == 0) {
      toast.error('Please select any start and end Date.');
    } else if (!weeklySchedule.length == 7) {
      toast.error('Please select slots of all days in the weekly schedule.');
    } else {
      const availabilityData = {
        isAvailable: true,
        startDate: JSON.stringify(formatedstartDate),
        endDate: JSON.stringify(formatedendDate),
        availabletimeslot: JSON.stringify(weeklySchedule)
      };
      console.log('avalibity data in handlesubmit:', availabilityData);

      const { enableSlotService } = await import(
        '@/services/user/slot.service'
      );

      try {
        const { data } = await enableSlotService(availabilityData);
        if (data) {
          toast.success(`Successfully updated`);
        }
      } catch (error) {
        toast.error(`something error occured:`, error);
      }
    }
  };

  const userData = {
    availableSlots: weeklySlot
  };

  return (
    <div>
      <Chatheader backgroundColor="rgba(250, 236, 236, 0.8)" />
      <div className="notifymbsecond">
        <Notify backgroundColor="transparent" color="black" />
      </div>
      <Mastersidebar className="sbar-height-chat" isCompanion={true} />

      <div className="md:w-[75rem] w-[95%] mx-auto md:my-5 my-10 p-8 md:p-10">
        <div className='flex justify-between'>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-black">Set Availability</h1>
          <p className="text-gray-600 text-sm">
            Configure your schedule and weekly availability patterns
          </p>
        </div>
        <div>
          <button
            onClick={() => setIsOn(!isOn)}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              isOn ? 'bg-red-600' : 'bg-white border-2 border-red-600'
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full transition-transform ${
                isOn ? 'bg-white translate-x-7' : 'bg-red-600 translate-x-1'
              }`}
            />
          </button>
        </div>
        </div>

        <div className="bg-white overflow-hidden">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2 p-1 md:p-1 border-b lg:border-b-0 lg:border-r border-red-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-pink-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Availability Period
                </h2>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Select the date range for your availability
              </p>
              <div className="bg-gradient-to-br from-red-50 to-pink-50 p-0 md:p-6 rounded-2xl shadow-inner ">
                {startDate ? (
                  <Calendar
                    CalendarData={handleCalendarSubmit}
                    initialStartDate={startDate}
                    initialEndDate={endDate}
                  />
                ) : (
                  <Calendar CalendarData={handleCalendarSubmit} />
                )}
              </div>
            </div>

            <div className="w-full lg:w-1/2 px-2 py-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-pink-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Weekly Availability Pattern
                </h2>
              </div>
              <p className="text-gray-500 text-sm my-6">
                Click on time slots to select consecutive hours
              </p>
              {weeklySlot && weeklySlot.length > 0 ? (
                <WeeklyScheduler
                  selectedslotData={handleslotselected}
                  initialSlots={userData.availableSlots || []}
                />
              ) : (
                <>
                  <WeeklyScheduler selectedslotData={handleslotselected} />
                </>
              )}
            </div>
          </div>
          {/* Info Banner */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-200 px-8 py-5 mt-3">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-amber-800 text-sm leading-relaxed">
                After setting your availability, updates can be made only once
                the selected end date has passed.
              </p>
            </div>
          </div>

          <div className="px-8 md:px-10 py-6 bg-gray-50 flex justify-end">
            <button
              className="group relative px-10 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-red-300 hover:scale-105 active:scale-95 overflow-hidden"
              onClick={handleFinalSubmit}
            >
              <span className="relative z-10 flex items-center gap-2">
                Set Availability
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
