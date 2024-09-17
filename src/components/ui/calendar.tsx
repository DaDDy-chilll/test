import React, { useState, useEffect } from 'react';

// Utility function to get days in a month
const getDaysInMonth = (year: any, month: any) => {
  return new Array(31).fill(null).map((_, i) => new Date(year, month, i + 1)).filter(date => date.getMonth() === month);
};

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1);
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
    }
  };

  return (
    <div className="calendar-container max-w-md mx-auto p-4">
      {/* Calendar Header */}
      <div className="calendar-header flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-lg text-gray-500 hover:text-black">
          &lt;
        </button>
        <div className="text-xl font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </div>
        <button onClick={handleNextMonth} className="text-lg text-gray-500 hover:text-black">
          &gt;
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4 text-center text-sm text-gray-700">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={index} className="font-semibold">
            {day}
          </div>
        ))}
        {daysInMonth.map((date, index) => (
          <div
            key={index}
            className={`py-2 ${date.getDate() === today.getDate() && currentMonth === today.getMonth() ? 'bg-black text-white rounded-full' : ''}`}
          >
            {date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
