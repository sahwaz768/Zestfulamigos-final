import React, { useEffect, useState, useRef } from 'react';

const WeeklyScheduler = ({ selectedslotData, initialSlots = [] }) => {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Mon');
  const isInitialized = useRef(false);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 15 }, (_, i) => i + 9);

  const formatHour = (hour) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  const getSlotId = (day, hour) => `${day}-${hour}`;

  const isSlotSelected = (day, hour) => {
    return selectedSlots.includes(getSlotId(day, hour));
  };

  const handleSlotClick = (day, hour) => {
    const slotId = getSlotId(day, hour);

    const currentDaySlots = selectedSlots.filter((slot) =>
      slot.startsWith(`${day}-`)
    );
    const otherDaysSlots = selectedSlots.filter(
      (slot) => !slot.startsWith(`${day}-`)
    );

    if (currentDaySlots.length === 0) {
      setSelectedSlots([...otherDaysSlots, slotId]);
    } else {
      const currentHours = currentDaySlots
        .map((slot) => parseInt(slot.split('-')[1]))
        .sort((a, b) => a - b);
      const minHour = Math.min(...currentHours);
      const maxHour = Math.max(...currentHours);

      if (hour === maxHour + 1 || hour === minHour - 1) {
        const newMin = Math.min(minHour, hour);
        const newMax = Math.max(maxHour, hour);
        const newSlots = [];
        for (let h = newMin; h <= newMax; h++) {
          newSlots.push(getSlotId(day, h));
        }
        setSelectedSlots([...otherDaysSlots, ...newSlots]);
      } else if (hour >= minHour && hour <= maxHour) {
        const newSlots = [];
        for (let h = minHour; h <= hour; h++) {
          newSlots.push(getSlotId(day, h));
        }
        setSelectedSlots([...otherDaysSlots, ...newSlots]);
      } else {
        setSelectedSlots([...otherDaysSlots, slotId]);
      }
    }
  };

  // Initialize with pre-existing data only once
  useEffect(() => {
    if (!isInitialized.current && initialSlots && initialSlots.length > 0) {
      setSelectedSlots(initialSlots);
      isInitialized.current = true;
    }
  }, []);

  // Notify parent component of changes
  useEffect(() => {
    if (selectedslotData && selectedSlots.length >= 0) {
      selectedslotData(selectedSlots);
    }
  }, [selectedSlots]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-8xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Day selector */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            <div className="flex-shrink-0 w-24"></div>
            <div className="flex flex-1">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`flex-1 h-20 text-base font-bold transition-all duration-300 border-l border-gray-200 relative ${
                    selectedDay === day
                      ? 'bg-white text-red-500 shadow-lg'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {day}
                  {selectedDay === day && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex">
            {/* Time column */}
            <div className="flex-shrink-0 w-24 bg-gray-50">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="h-20 border-b border-gray-200 flex items-center justify-center"
                >
                  <span className="text-sm font-semibold text-gray-600">
                    {formatHour(hour)}
                  </span>
                </div>
              ))}
            </div>

            {/* Time slots */}
            <div className="flex-1">
              <div className="w-full">
                {hours.map((hour) => (
                  <div
                    key={`${selectedDay}-${hour}`}
                    className={`h-20 border-b border-l border-gray-200 cursor-pointer transition-all duration-200 relative group ${
                      isSlotSelected(selectedDay, hour)
                        ? 'bg-red-500 hover:bg-red-600 shadow-inner'
                        : 'bg-white hover:bg-red-50'
                    }`}
                    onClick={() => handleSlotClick(selectedDay, hour)}
                  >
                    {isSlotSelected(selectedDay, hour) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-transparent"></div>
                    )}
                    {!isSlotSelected(selectedDay, hour) && (
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-500/5"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyScheduler;