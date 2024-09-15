import clsx from "clsx";
import { format, isToday } from "date-fns";

interface Event {
  date: string;
  title: string;
}

type CalendarCellProps = {
  day: Date;
  todaysEvents: Event[];
};

const CalendarCell = ({ day, todaysEvents }: CalendarCellProps) => {
  return (
    <div
      className={clsx(
        "h-20 flex flex-col rounded-md items-center justify-center",
        {
          "border border-red-400 bg-[#E5D5D9]": isToday(day),
          "bg-[#E5D5D9]": !isToday(day),
        }
      )}
    >
      <div className={clsx("w-8 h-8 flex items-center justify-center mx-auto")}>
        {format(day, "d")}
      </div>
      {todaysEvents.length !== 0 && (
        <div className="flex items-center gap-1">
          <div className="bg-primaryColor w-2 h-2 rounded-full"></div>
          {todaysEvents.length > 1 && (
            <p className="text-xs text-primaryColor">+{todaysEvents.length}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarCell;
