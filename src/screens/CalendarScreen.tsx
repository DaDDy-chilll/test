import Layout from "@/layouts/Layout";
import clsx from "clsx";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
} from "date-fns";
import { useMemo } from "react";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface Event {
  date: string;
  title: string;
}

interface EventCalendarProps {
  events: Event[];
}

const CalendarScreen = ({ events }: EventCalendarProps) => {
  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const startingDayIndex = getDay(firstDayOfMonth) === 0 ? 6 : getDay(firstDayOfMonth) - 1; // Adjusting the starting index

  const eventsByDate = useMemo(() => {
    return events.reduce((acc: { [key: string]: Event[] }, event) => {
      const dateKey = format(new Date(event.date), "yyyy-MM-dd");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    }, {});
  }, [events]);

  return (
    <Layout>
      <div className="container mx-auto p-4 text-white">
        <div className="mb-4">
          <h2 className="text-center text-xl">{format(currentDate, "MMMM yyyy")}</h2>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {WEEKDAYS.map((day) => {
            return (
              <div key={day} className="font-bold text-center">
                {day}
              </div>
            );
          })}
          {Array.from({ length: startingDayIndex }).map((_, index) => {
            return (
              <div
                key={`empty-${index}`}
                className="p-2 text-center"
              />
            );
          })}
          {daysInMonth.map((day, index) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const todaysEvents = eventsByDate[dateKey] || [];
            return (
              <div
                key={index}
                className={clsx("p-2 text-center", {
                  "bg-gray-700": isToday(day),
                  "bg-gray-900": !isToday(day),
                })}
              >
                <div className={clsx("rounded-full w-8 h-8 flex items-center justify-center mx-auto", {
                  "bg-gray-300 text-black": isToday(day),
                  "text-white": !isToday(day),
                })}>
                  {format(day, "d")}
                </div>
                {todaysEvents.map((event) => {
                  return (
                    <div
                      key={event.title}
                      className="bg-green-500 rounded-md text-gray-900  mt-1 text-xs"
                    >
                      {event.title}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default CalendarScreen;
