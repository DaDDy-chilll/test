import { useState } from "react";

type TimeSelectProps = {
  onTimeSelect: (time: string) => void;
  dropStyle?: number;
};

const TimeSelect = ({ onTimeSelect, dropStyle }: TimeSelectProps) => {
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [isOpen, setIsOpen] = useState(false);

  // Create a list of times in 30-minute intervals
  const generateTimes = () => {
    const times = [];
    for (let hour = 1; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        times.push(
          `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
        );
      }
    }
    return times;
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    setIsOpen(false);
    onTimeSelect(time);
  };

  return (
    <div className="relative inline-block">
      <div
        className={`bg-gray-300 text-black text-sm px-3 py-1 rounded-md flex justify-between items-center cursor-pointer ${dropStyle === 1 ? "w-20 text-sm" : "w-40 "}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mr-2 ">{selectedTime}</span>
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
            dropStyle === 1 ? "h-40 z-10" : "h-60 z-20"
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
