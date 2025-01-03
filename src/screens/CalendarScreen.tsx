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
import { apiRoutes } from "@/utils/apiRoutes";
import { Event } from "@/types/helperTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { QueryKey } from "@/utils/queryKey";
import { useDispatch } from "react-redux";
import { setTitle } from "@/store";
import { fetchServer } from "@/utils/helper";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import RouteName from "@/navigations/routes";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const today = moment().format("YYYY-MM-DD");

const CalendarScreen = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvents, setSelectedEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const [hasTodayEvents, setHasTodayEvents] = useState<any>({
    date: "",
    events: null,
  });

  /**
   * This function is used to go to the next month
   * @author PSK
   */
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  /**
   * This function is used to go to the previous month
   * @author PSK
   */
  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const startingDayIndex = getDay(firstDayOfMonth);
  const endingDayIndex = (7 - getDay(lastDayOfMonth) - 1) % 7;
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  /**
   * This query is used to fetch events of the month
   * @author PSK
   * @returns {object} The list of events of the month
   */
  const {
    data: eventsOfMonth,
    isLoading: isEventsLoading,
    refetch,
  } = useQuery({
    queryKey: [QueryKey.INTERVIEW, currentDate],
    queryFn: () => {
      return fetchServer({
        endpoint: `${apiRoutes.INTERVIEW}?start_date=${moment(currentDate)
          .startOf("month")
          .format("YYYY-MM-DD")}&end_date=${moment(currentDate)
          .endOf("month")
          .format("YYYY-MM-DD")}`,
        token: token as string,
        method: "GET",
      });
    },
    enabled: !!token && !!currentDate,
  });


  /**
   * This function is used to handle cell click
   * @author PSK
   * @param {Event} todaysEvents - The events of the day
   * @param {string} dateKey - The date key
   */
  const handleCellClick = (todaysEvents: Event, dateKey: string) => {
    setSelectedDate(dateKey);
    setSelectedEvents(coverInterviews(todaysEvents));
  };

  /**
   * This function is used to handle event click
   * @author PSK
   */
  const handleEventClick = () => {
    navigate(RouteName.CHAT);
  };

  /**
   * This function is used to cover interviews
   * @author PSK
   * @param {any} data - The data to cover
   * @returns {array} The list of covered interviews
   */
  const coverInterviews = useCallback((data: any) => {
    if (!data) return [];
    return Object.entries(data.interviews || {}).flatMap(
      ([name, interviews]) => {
        return (interviews as any[]).map((interview) => {
          return {
            name,
            user_photo: interview.user_photo,
            start_time: interview.start_time,
            end_time: interview.end_time,
            job_title: interview.job_title,
            chat_id: interview.chat_id,
          };
        });
      },
    );
  }, []);

  /**
   * useEffect to set the title of the page
   * @author PSK
   */
  useEffect(() => {
    dispatch(setTitle(jp.calendar));
  }, [dispatch]);

  /**
   * useEffect to refetch data when currentDate changes
   * @author PSK
   */
  useEffect(() => {
    refetch();
  }, [currentDate, refetch]);

  /**
   * useEffect to set today's events
   * @author PSK
   */
  useEffect(() => {
    if (eventsOfMonth) {
      Object.entries(eventsOfMonth.data).forEach(([key, value]) => {
        if (key === today) {
          setHasTodayEvents({ date: key, events: coverInterviews(value) });
        }
      });
    }
  }, [eventsOfMonth, coverInterviews]);

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
        className="w-full grid grid-cols-3 gap-x-4 p-4"
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
                  className={`font-normal py-2 text-center ${
                    day == "Sun" || day == "Sat" ? "bg-[#F6D5D5]" : "bg-white"
                  } text-secondaryColor rounded-md select-none`}
                >
                  {day}
                </div>
              );
            })}
            {Array.from({ length: startingDayIndex }).map((_, index) => {
              const isWeekend = (index + 1) % 7 === 0 || index % 7 === 0;
              return (
                <div
                  key={`empty-${index}`}
                  className={`p-2 ${
                    isWeekend ? "bg-[#E5D5D9]" : "bg-white"
                  } rounded-md text-center`}
                />
              );
            })}
            {daysInMonth.map((day, index) => {
              const dateKey = format(day, "yyyy-MM-dd");
              const todaysEvents = eventsOfMonth?.data[dateKey] || [];
              const dayName = format(day, "EEE");
              return (
                <CalendarCell
                  key={index}
                  day={day}
                  todaysEvents={todaysEvents}
                  handleClick={() => handleCellClick(todaysEvents, dateKey)}
                  year={moment(currentDate).year()}
                  isWeekend={dayName == "Sun" || dayName == "Sat"}
                />
              );
            })}
            {Array.from({ length: endingDayIndex }).map((_, index) => {
              const trailingDay = (getDay(lastDayOfMonth) + index + 1) % 7;
              const isWeekend = trailingDay === 0 || trailingDay === 6;
              return (
                <div
                  key={`empty-trailing-${index}`}
                  className={`p-2 ${
                    isWeekend ? "bg-[#E5D5D9]" : "bg-white"
                  } rounded-md text-center`}
                />
              );
            })}
          </div>
        </div>
        <div className="col-span-1 px-4 rounded-lg bg-[#F0F0F0] h-full">
          <h2 className="text-center text-base my-6">{jp.meetings}</h2>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              {selectedDate && selectedEvents.length > 0
                ? format(selectedDate, "yyyy-MM-dd")
                : format(new Date(), "yyyy-MM-dd")}
            </p>
          </div>
          <div className="overflow-y-auto my-5 h-[calc(100vh-250px)] flex flex-col gap-2">
            {selectedEvents.length > 0 ? (
              selectedEvents.map((event: Event, index: number) => {
                return (
                  <EventListItem
                    key={index}
                    event={event}
                    onClick={handleEventClick}
                  />
                );
              })
            ) : hasTodayEvents.events ? (
              hasTodayEvents.events.map((event: Event, index: number) => {
                return (
                  <EventListItem
                    key={index}
                    event={event}
                    onClick={handleEventClick}
                  />
                );
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
