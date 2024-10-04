import { motion } from "framer-motion";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
  subMonths,
  addMonths,
} from "date-fns";
import { useMemo, useState, useEffect } from "react";
import {CalendarCell,EventListItem,Loading} from "@/components";
import { jp } from "@/lang/jp";
import useFetch from "@/hooks/useFetch";
import { apiRoutes } from "@/utils/apiRoutes";
import { Event } from "@/types/helperTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { QueryKey } from "@/utils/queryKey";
import { useDispatch } from "react-redux";
import { setTitle } from "@/store";
import { Helmet } from "react-helmet-async";
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CalendarScreen = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  // const { data, isLoading, isError, isSuccess, error } = useFetch({
  //   endpoint: apiRoutes.EVENTS,
  //   token: token as string,
  //   key: QueryKey.EVENTS,
  // });
  // const events: Event[] = data || [];
  const events: Event[] =  [];
  const today = format(new Date(), "yyyy-MM-dd");
  useEffect(() => {
    dispatch(setTitle(jp.calendar));
  }, [dispatch]);
  const eventsByDate = useMemo(() => {
    return events.reduce((acc: { [key: string]: Event[] }, event: Event) => {
      const dateKey = format(new Date(event.date), "yyyy-MM-dd");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    }, {});
  }, [events]);
  const dayEvents = eventsByDate[today] || [];

  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });
  const startingDayIndex =
    getDay(firstDayOfMonth) === 0 ? 6 : getDay(firstDayOfMonth) - 1; // Adjusting the starting index
  const endingDayIndex =
    getDay(lastDayOfMonth) === 0 ? 0 : 7 - getDay(lastDayOfMonth);

  const handleCellClick = (todaysEvents: Event[]) =>
    setSelectedEvents(todaysEvents);

  return (
    <>
           <Helmet>
      <title>{jp.calendar} - Japan Job</title>
    </Helmet>
      {false && (
        <Loading isLoading={false} className="h-[calc(100vh-68px)]" />
      )}
      <motion.div
        variants={calendarVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full  grid grid-cols-3 gap-x-4 p-4"
      >
        <div className="col-span-2 rounded-lg bg-[#F0F0F0] p-4 shadow-lg">
          <div className="mb-4">
            {/* Header with Month and Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={goToPreviousMonth}
                className="bg-primaryColor text-white p-2 rounded hover:bg-primaryColor/30"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              <h2 className="text-center text-xl">
                {format(currentDate, "MMMM yyyy")}
              </h2>

              <button
                onClick={goToNextMonth}
                className="bg-primaryColor text-white p-2 rounded hover:bg-primaryColor/30"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {WEEKDAYS.map((day) => {
              return (
                <div
                  key={day}
                  className="font-normal py-2 text-center bg-[#F6D5D5] text-secondaryColor rounded-md"
                >
                  {day}
                </div>
              );
            })}
            {Array.from({ length: startingDayIndex }).map((_, index) => {
              return (
                <div
                  key={`empty-${index}`}
                  className="p-2 bg-[#E5D5D9] rounded-md text-center "
                />
              );
            })}
            {daysInMonth.map((day, index) => {
              const dateKey = format(day, "yyyy-MM-dd");
              const todaysEvents = eventsByDate[dateKey] || [];
              return (
                <CalendarCell
                  key={index}
                  day={day}
                  todaysEvents={todaysEvents}
                  handleClick={() => handleCellClick(todaysEvents)}
                />
              );
            })}
            {Array.from({ length: endingDayIndex }).map((_, index) => {
              return (
                <div
                  key={`empty-${index}`}
                  className="p-2 bg-[#E5D5D9] rounded-md text-center "
                />
              );
            })}
          </div>
        </div>
        <div className="col-span-1 px-4 rounded-lg bg-[#F0F0F0] h-full">
          <h2 className="text-center text-base my-6">~~{jp.meetings}</h2>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              {selectedEvents.length > 0
                ? format(selectedEvents[0].date, "yyyy-MM-dd")
                : dayEvents.length > 0 &&
                  format(dayEvents[0].date, "yyyy-MM-dd")}
            </p>
            <select className="bg-primaryColor text-white p-2 rounded-md text-xs">
              <option value="all">All</option>
              <option value="JLPT N4">JLPT N4</option>
            </select>
          </div>
          <div className="overflow-y-auto my-5 h-[calc(100vh-250px)] flex flex-col gap-2">
            {selectedEvents.length > 0 ? (
              selectedEvents.map((event, index) => (
                <EventListItem key={index} event={event} />
              ))
            ) : dayEvents.length > 0 ? (
              dayEvents.map((event, index) => (
                <EventListItem key={index} event={event} />
              ))
            ) : (
              <p className="text-center text-gray-500 pt-10">
                {jp.noEventsForThisDay}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

const calendarVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
export default CalendarScreen;
