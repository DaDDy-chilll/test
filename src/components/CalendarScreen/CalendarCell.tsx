import clsx from "clsx";
import { format, isToday } from "date-fns";
import moment from "moment";
import Holidays from "./Holidays";


interface Event {
count: number
interviews:any
}

type CalendarCellProps = {
  day: Date;
  todaysEvents: Event;
  handleClick: (todaysEvents: Event) => void;
  year:any
};

const CalendarCell = ({
  day,
  todaysEvents,
  handleClick,
  year
}: CalendarCellProps) => {
  const clickEvent = () => handleClick(todaysEvents);


  return (
    <div
      className={clsx(
        "h-20 flex flex-col rounded-md items-center justify-center  active:scale-90 transition-all duration-100 cursor-pointer ",
        {
          "border border-red-400 bg-[#E5D5D9]": isToday(day),
          "bg-[#E5D5D9]": !isToday(day),
        }
      )}
      onClick={clickEvent}
    >
      <div className={clsx("w-8  text-sm flex items-center justify-center mx-auto")}>
        {format(day, "d")}
      </div>
    <Holidays date={moment(day).format("YYYY-MM-DD")} year={year} />
      
      {todaysEvents.interviews && (
        <div className="flex items-center gap-1">
          <div className="bg-primaryColor w-2 h-2 rounded-full"></div>
          {todaysEvents.count > 1 && (
            <p className="text-xs text-primaryColor">+{todaysEvents.count}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarCell;
