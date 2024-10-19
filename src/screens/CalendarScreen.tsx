import { motion } from "framer-motion";
import moment from "moment";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
  subMonths,
  addMonths,
} from "date-fns";
import { useState, useEffect, useCallback } from "react";
import { CalendarCell, EventListItem, Loading } from "@/components";
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
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const startForMonth = moment().startOf("month").format("YYYY-MM-DD");
const endForMonth = moment().endOf("month").format("YYYY-MM-DD");
const today = moment().format("YYYY-MM-DD");
const CalendarScreen = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvents, setSelectedEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const [hasTodayEvents, setHasTodayEvents] = useState<any>({
    date: "",
    events: null,
  });
  const { data: eventsOfMonth, isLoading: isEventsLoading } = useFetch({
    endpoint: `${apiRoutes.INTERVIEW}?start_date=${startForMonth}&end_date=${endForMonth}`,
    token: token as string,
    key: QueryKey.INTERVIEW,
  });
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });
  const startingDayIndex = getDay(firstDayOfMonth); // Adjusting the starting index
  const endingDayIndex =
    getDay(lastDayOfMonth) === 0 ? 0 : 6 - getDay(lastDayOfMonth);

  const handleCellClick = (todaysEvents: Event, dateKey: string) => {
    setSelectedDate(dateKey);
    setSelectedEvents(coverInterviews(todaysEvents));
  };

  const coverInterviews = useCallback((data: any) => {
    if (!data) return [];
    return Object.entries(data as any[]).flatMap(([_, interviews]) => {
      return Object.entries(interviews as Record<string, any>).map(
        ([key, value]) => {
          return {
            name: key,
            user_photo: value[0].user_photo,
            start_time: value[0].start_time,
            end_time: value[0].end_time,
            job_title: value[0].job_title,
          };
        },
      );
    });
  }, []);

  useEffect(() => {
    dispatch(setTitle(jp.calendar));
  }, [dispatch]);

  useEffect(() => {
    if (eventsOfMonth) {
      Object.entries(eventsOfMonth.data).forEach(([key, value]) => {
        if (key === today) {
          setHasTodayEvents({ date: key, events: coverInterviews(value) });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventsOfMonth]);

  return (
    <>
      <Helmet>
        <title>{jp.calendar} - Japan Job</title>
      </Helmet>
      {isEventsLoading && (
        <Loading isLoading={isEventsLoading} className="h-[calc(100vh-68px)]" />
      )}
      <motion.main
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
                title="前の月"
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
                {moment(currentDate).format("YYYY年  MM月")}
                {/* {format(currentDate, "MMMM yyyy")} */}
              </h2>

              <button
                onClick={goToNextMonth}
                title="次の月"
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
                  className="font-normal py-2 text-center bg-[#F6D5D5] text-secondaryColor rounded-md select-none"
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
              const todaysEvents = eventsOfMonth?.data[dateKey] || [];
              return (
                <CalendarCell
                  key={index}
                  day={day}
                  todaysEvents={todaysEvents}
                  handleClick={() => handleCellClick(todaysEvents, dateKey)}
                  year={moment(currentDate).year()}
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
              {selectedDate && selectedEvents.length > 0
                ? format(selectedDate, "yyyy-MM-dd")
                : format(new Date(), "yyyy-MM-dd")}
            </p>
            {/* <select className="bg-primaryColor text-white p-2 rounded-md text-xs">
              <option value="all">All</option>
              <option value="JLPT N4">JLPT N4</option>
            </select> */}
          </div>
          <div className="overflow-y-auto my-5 h-[calc(100vh-250px)] flex flex-col gap-2">
            {selectedEvents.length > 0 ? (
              selectedEvents.map((event: Event, index: number) => {
                return <EventListItem key={index} event={event} />;
              })
            ) : hasTodayEvents.events ? (
              hasTodayEvents.events.map((event: Event, index: number) => {
                return <EventListItem key={index} event={event} />;
              })
            ) : (
              <p className="text-center text-gray-500 mt-10">
                {jp.noInterviewSchedule}
              </p>
            )}
          </div>
        </div>
      </motion.main>
    </>
  );
};

const calendarVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
export default CalendarScreen;
