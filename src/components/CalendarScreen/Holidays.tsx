import { useEffect, useState } from "react";
import Holiday from "date-holidays";
import moment from "moment";

type PropsType = {
  date: string;
  year: string;
};

const Holidays = ({ date, year }: PropsType) => {
  const [holidays, setHolidays] = useState<any[]>([]);
  const holidayForDate = holidays.filter(
    (day) =>
      moment(day.date).format("YYYY-MM-DD") ===
      moment(date).format("YYYY-MM-DD"),
  )[0];

  /**
   * This Effect is used to set the holidays list of the year.
   * @author PSK
   */
  useEffect(() => {
    const hd = new Holiday("JP");
    const holidaysList = hd.getHolidays(year);
    setHolidays(holidaysList);
  }, [year]);

  if (!holidayForDate?.name) return;
  return (
    <div
      data-tooltip-target="tooltip-default"
      className="relative group py-2  flex flex-col items-start justify-center gap-1 cursor-pointer select-none"
    >
      <ul>
        {holidays
          .filter(
            (day) =>
              moment(day.date).format("YYYY-MM-DD") ===
              moment(date).format("YYYY-MM-DD"),
          )
          .map((holiday) => (
            <li
              key={holiday.date}
              className=" text-white bg-primaryColor px-2 rounded-sm"
            >
              <p className="text-[.8rem] tracking-widest font-light">
                {/* {holiday.name} */}
                {holiday.name.length <= 4
                  ? holiday.name
                  : `${holiday.name.slice(0, 4)}...`}
              </p>
            </li>
          ))}
      </ul>
      {holidayForDate?.name.length > 4 && (
        <div className="absolute invisible group-hover:visible z-50 bg-white border border-gray-200 rounded-sm  p-2 mt-1  left-10 ml-2">
          {holidays
            .filter(
              (day) =>
                moment(day.date).format("YYYY-MM-DD") ===
                moment(date).format("YYYY-MM-DD"),
            )
            .map((holiday, index) => (
              <p
                key={index}
                className="text-xs text-gray-700 whitespace-nowrap my-2"
              >
                {holiday.name}
              </p>
            ))}
        </div>
      )}
    </div>
  );
};

export default Holidays;
