import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import SelectYear from "@/components/ui/selectYear";
import moment from "moment";
// Utility function to get days in a month
const getDaysInMonth = (year: number, month: number) => {
  return new Array(31)
    .fill(null)
    .map((_, i) => new Date(year, month, i + 1))
    .filter((date) => date.getMonth() === month);
};

type CalendarProps = {
  className?: string;
  style?: number;
  selectedDate?: (date: Date) => void;
};

const Calendar = ({ className, style = 0, selectedDate }: CalendarProps) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  // Get days in the current month
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  // Get the day of the week of the first day of the current month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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

  useEffect(() => {
    setCurrentYear(selectedYear);
  }, [selectedYear]);

  return (
    <div className={cn("calendar-container w-full p-4", className)}>
      {/* Calendar Header */}
      {style !== 0 && (
        <div className="text-center mb-3">
          <SelectYear onYearSelect={setSelectedYear} year={selectedYear} />
        </div>
      )}
      <div className="calendar-header flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="text-lg text-gray-500 hover:text-black"
        >
          &lt;
        </button>
        <div className="text-normal font-normal">
          {style === 0
            ? monthNames[currentMonth] + " " + currentYear
            : monthNames[currentMonth]}
        </div>
        <button
          onClick={handleNextMonth}
          className="text-lg text-gray-500 hover:text-black"
        >
          &gt;
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4 text-center text-sm text-gray-700">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div key={index} className="font-semibold">
            {day}
          </div>
        ))}

        {/* Add padding for days before the 1st of the month */}
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, index) => (
            <div key={index}></div>
          ))}

        {/* Render the days of the month */}
        {daysInMonth.map((date, index) => (
          <div
            key={index}
            onClick={() => selectedDate && selectedDate(date)}
            className={`${style === 0 ? "py-2" : "m-1 cursor-pointer"} ${
              date.getDate() === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear()
                ? style === 0
                  ? "bg-black text-white rounded-full"
                  : "bg-none text-primaryColor"
                : ""
            }`}
          >
            {date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
