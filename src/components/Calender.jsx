import React, { useState, useEffect } from 'react';

export const Calendar = ({ CalendarData, initialStartDate = null, initialEndDate = null }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1));
  const [selectedDates, setSelectedDates] = useState([]);
  const [startDate, setStartDate] = useState(null);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Initialize with pre-existing dates if provided
  useEffect(() => {
    if (initialStartDate && initialEndDate) {
      const start = new Date(initialStartDate);
      const end = new Date(initialEndDate);
      
      // Generate all dates between start and end
      const dates = [];
      const current = new Date(start);
      
      while (current <= end) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
      
      setSelectedDates(dates);
      setStartDate(start);
      setCurrentDate(new Date(start.getFullYear(), start.getMonth(), 1));
    }
  }, [initialStartDate, initialEndDate]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    clickedDate.setHours(0, 0, 0, 0);

    // If no dates selected, start new selection
    if (selectedDates.length === 0) {
      setStartDate(clickedDate);
      setSelectedDates([clickedDate]);
      return;
    }

    // Normalize all selected dates for comparison
    const normalizedSelectedDates = selectedDates.map(date => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      return d;
    });

    const lastSelected = normalizedSelectedDates[normalizedSelectedDates.length - 1];
    const nextDay = new Date(lastSelected);
    nextDay.setDate(lastSelected.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);

    // Check if clicked on the last selected date (to deselect it)
    if (clickedDate.getTime() === lastSelected.getTime()) {
      if (normalizedSelectedDates.length === 1) {
        // If only one date selected, clear everything
        setSelectedDates([]);
        setStartDate(null);
      } else {
        // Remove the last date
        const newDates = selectedDates.slice(0, -1);
        setSelectedDates(newDates);
      }
      return;
    }

    // Check if clicked on the next consecutive date (to add it)
    if (clickedDate.getTime() === nextDay.getTime()) {
      setSelectedDates([...selectedDates, clickedDate]);
      return;
    }

    // Otherwise, start a new selection
    setStartDate(clickedDate);
    setSelectedDates([clickedDate]);
  };

  const isDateSelected = (day) => {
    return selectedDates.some(
      (date) =>
        date.getDate() === day &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()
    );
  };

  const isStartDate = (day) => {
    return (
      startDate &&
      startDate.getDate() === day &&
      startDate.getMonth() === currentDate.getMonth() &&
      startDate.getFullYear() === currentDate.getFullYear()
    );
  };

  const isEndDate = (day) => {
    if (selectedDates.length === 0) return false;
    const endDate = selectedDates[selectedDates.length - 1];
    return (
      endDate.getDate() === day &&
      endDate.getMonth() === currentDate.getMonth() &&
      endDate.getFullYear() === currentDate.getFullYear()
    );
  };

  const calculateDateRange = () => {
    if (selectedDates.length === 0) return null;
    if (selectedDates.length === 1)
      return [
        '1 day selected',
        {
          startDate: selectedDates[0],
          endDate: selectedDates[0]
        }
      ];

    const days = selectedDates.length;
    const start = selectedDates[0];
    const end = selectedDates[selectedDates.length - 1];

    const formatDate = (date) => {
      return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    };

    return [
      `${formatDate(start)} - ${formatDate(end)} (${days} days)`,
      {
        startDate: start,
        endDate: end
      }
    ];
  };

  useEffect(() => {
    if (CalendarData) {
      const result = calculateDateRange();
      CalendarData(
        result && result[1] ? result[1] : { startDate: null, endDate: null }
      );
    }
  }, [selectedDates]);

  const renderCalendarDays = () => {
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const selected = isDateSelected(day);
      const isStart = isStartDate(day);
      const isEnd = isEndDate(day);

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`h-12 flex items-center justify-center cursor-pointer text-sm font-medium transition-all relative
            ${
              selected
                ? 'bg-red-500 text-white rounded-full'
                : 'text-gray-700 hover:bg-red-100 rounded-full'
            }
            ${isEnd && selectedDates.length > 1 ? 'ring-2 ring-red-700 ring-offset-2' : ''}`}
        >
          {day}
          {isStart && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
          )}
        </div>
      );
    }

    return days;
  };

  const dateRange = calculateDateRange();

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            {monthNames[currentDate.getMonth()]}, {currentDate.getFullYear()}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          This calendar is in your time zone: IST
        </p>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-xs font-semibold text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mb-6">{renderCalendarDays()}</div>

      {dateRange && (
        <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
          <p className="text-sm font-semibold text-red-800">
            Chosen availability duration:
          </p>
          <p className="text-sm text-red-700 mt-1">{dateRange[0]}</p>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>Click a date to start selection.</p>
        <p className="mt-1">Click the next consecutive date to extend, or click the last date to remove it.</p>
        <p className="mt-1">Start date marked with green dot • Last date has ring around it</p>
      </div>
    </div>
  );
};