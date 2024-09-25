import React, { useState } from "react";
import moment from "moment";

type TimeSelectProps = {
  onTimeSelect: (time: moment.Moment) => void;
  dropStyle?: number;
};

const TimeSelect = ({ onTimeSelect, dropStyle }: TimeSelectProps) => {
  const [selectedTime, setSelectedTime] = useState(moment("09:00", "HH:mm"));
  const [isOpen, setIsOpen] = useState(false);

  // Create a list of times in 30-minute intervals using moment
  const generateTimes = () => {
    const times = [];
    let startTime = moment("01:00", "HH:mm");
    const endTime = moment("23:00", "HH:mm");
    while (startTime <= endTime) {
      times.push(startTime.format("HH:mm"));
      startTime = startTime.add(30, "minutes");
    }
    return times;
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(moment(time, "HH:mm"));
    setIsOpen(false);
    onTimeSelect(moment(time, "HH:mm"));
  };

  return (
    <div className="relative inline-block">
      <div
        className="bg-gray-300 text-black text-sm px-3 py-1  rounded-full flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mr-2">{selectedTime.format("HH:mm")}</span>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </div>

      {isOpen && (
        <ul
          className={`${
            dropStyle === 1 ? "h-40  z-10" : "h-60 z-20"
          } absolute top-full left-0 w-full overflow-y-auto bg-gray-300 text-black mt-1 rounded-lg shadow-lg z-10`}
        >
          {generateTimes().map((time) => (
            <li
              key={time}
              className="px-4 py-2 hover:bg-gray-400 cursor-pointer"
              onClick={() => handleTimeChange(time)}
            >
              {time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimeSelect;
