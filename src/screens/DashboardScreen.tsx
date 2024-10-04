import { useEffect, useRef } from "react";
import {LineCharts,Loading,EventListItem} from "@/components";
import { jp } from "@/lang/jp";
import { motion } from "framer-motion";
// import { events } from "@/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useChat from "@/hooks/useChat";
import moment from "moment";
import useFetch from "@/hooks/useFetch";
import { apiRoutes } from "@/utils/apiRoutes";
import { useMemo } from "react";
import { format } from "date-fns";
import { Event, Chat } from "@/types/helperTypes";
import { useNavigate } from "react-router-dom";
import { QueryKey } from "@/utils/queryKey";
import { useDispatch } from "react-redux";
import { setTitle } from "@/store";
import { useState } from 'react';
import {Helmet} from 'react-helmet-async'

const DashboardScreen = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const { chats, isLoading: isChatLoading } = useChat({ id: user?.id });
  const dispatch = useDispatch();
  const scrollableRef = useRef<HTMLDivElement>(null);
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));

  useEffect(() => {
    dispatch(setTitle(jp.dashboard));

    const checkForScrollbar = () => {
      if (scrollableRef.current) {
        const hasScrollbar = scrollableRef.current.scrollHeight > scrollableRef.current.clientHeight;
        scrollableRef.current.classList.toggle('pr-3', hasScrollbar);
      }
    };

    checkForScrollbar();
    window.addEventListener('resize', checkForScrollbar);

    return () => {
      window.removeEventListener('resize', checkForScrollbar);
    };
  }, [dispatch]);

  /*
  const {
    data: events,
    isLoading: isEventLoading,
    isError,
    isSuccess,
    error,
  } = useFetch({
    endpoint: apiRoutes.EVENTS,
    token: token as string,
    key: QueryKey.EVENTS,
  });
  const today = format(new Date(), "yyyy-MM-dd");
  const { todayEvents, otherEvents } = useMemo(() => {
    if (isEventLoading) return { todayEvents: [], otherEvents: {} };
    return events.reduce(
      (
        acc: { todayEvents: Event[]; otherEvents: { [key: string]: Event[] } },
        event: Event
      ) => {
        const dateKey = format(new Date(event.date), "yyyy-MM-dd");
        if (dateKey === today) {
          acc.todayEvents.push(event);
        } else {
          if (!acc.otherEvents[dateKey]) {
            acc.otherEvents[dateKey] = [];
          }
          acc.otherEvents[dateKey].push(event);
        }
        return acc;
      },
      { todayEvents: [], otherEvents: {} }
    );
  }, [events]);
  
*/
  // TODO: remove this
  // Sample data for today's events
  const todayEvents = [
    {
      id: 1,
      title: "Team Meeting",
      date: format(new Date(new Date().setDate(new Date().getDate() + 1)), "yyyy-MM-dd"),
      description: "Discuss project updates and next steps",
    },
    {
      id: 2,
      title: "Client Call",
      date: format(new Date(new Date().setDate(new Date().getDate() + 1)), "yyyy-MM-dd"),
      description: "Review project requirements with the client",
    },
    {
      id: 3,
      title: "Project Planning",
      date: format(new Date(new Date().setDate(new Date().getDate() + 1)), "yyyy-MM-dd"),
      description: "Plan the next phase of the project",
    },
    {
      id: 4,
      title: "Design Review",
      date: format(new Date(new Date().setDate(new Date().getDate() + 1)), "yyyy-MM-dd"),
      description: "Review the latest design mockups",
    },
    {
      id: 5,
      title: "Code Review",
      date: format(new Date(new Date().setDate(new Date().getDate() + 1)), "yyyy-MM-dd"),
      description: "Review the latest code changes",
    },
    {
      id: 6,
      title: "Marketing Meeting",
      date: format(new Date(new Date().setDate(new Date().getDate() + 1)), "yyyy-MM-dd"),
      description: "Discuss marketing strategies",
    },
    {
      id: 7,
      title: "Sales Call",
      date: format(new Date(new Date().setDate(new Date().getDate() + 1)), "yyyy-MM-dd"),
      description: "Call with potential client",
    },
  ];

  // TODO: remove this
  // Sample data for upcoming events
  const upcomingEvents = Array.from({ length: 30 }, (_, index) => {
    const date = format(new Date(new Date().setDate(new Date().getDate() + index + 1)), "yyyy-MM-dd");
    return {
      [date]: Array.from({ length: index + 1 }, (_, eventIndex) => ({
        id: index * 15 + eventIndex + 1,
        title: `Event ${index * 15 + eventIndex + 1}`,
        date: date,
        description: `Description for event ${index * 15 + eventIndex + 1}`,
      })),
    };
  }).reduce((acc, event) => ({ ...acc, ...event }), {});

  // const todayEvents: any = [];
  // const upcomingEvents: any = {};

  const today = format(new Date(), "yyyy-MM-dd");

  const data = [
    {
      name: "January",
      matched: 5,
    },
    {
      name: "February",
      matched: 3,
    },
    {
      name: "March",
      matched: 6,
    },
    {
      name: "April",
      matched: 2,
    },
    {
      name: "May",
      matched: 4,
    },
    {
      name: "June",
      matched: 7,
    },
    {
      name: "July",
      matched: 1,
    },
    {
      name: "August",
      matched: 3,
    },
    {
      name: "September",
      matched: 5,
    },
    {
      name: "October",
      matched: 2,
    },
    {
      name: "November",
      matched: 4,
    },
    {
      name: "December",
      matched: 6,
    },
  ];

  const genderData = [
    {
      name: "Male",
      value: 400,
    },
    {
      name: "Female",
      value: 300,
    },
  ];

  const languageData = [
    {
      name: "N1",
      value: 400,
    },
    {
      name: "N2",
      value: 300,
    },
    {
      name: "N3",
      value: 200,
    },
    {
      name: "N4",
      value: 100,
    },
  ];

  const handleChatClick = (chat: Chat) => navigate("/chat", { state: chat });

  return (
    <>
    <Helmet>
      <title>{jp.dashboard} - Japan Job</title>
    </Helmet>
      {/* {(isEventLoading || isChatLoading) && (
        <Loading
          isLoading={isEventLoading || isChatLoading}
          className="h-[calc(100vh-68px)]"
        />
      )} */}
      <motion.div
        variants={dashboardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className=" w-full h-[calc(100vh+40vh)] grid grid-cols-6 grid-rows-4 gap-2 p-2 overflow-hidden"
      >
        {/* Line Chart */}
        <div className="bg-gray-100 col-span-6 row-span-2">
          <div className="flex justify-between items-center mx-3 mt-3">
            <h1 className="text-lg font-semibold">{jp.matchList}</h1>
          </div>
          <div className="w-full h-full pr-10 pt-2 pb-16">
            <LineCharts data={data} />
          </div>
        </div>

        {/* User Pie Chart */}
        {/* <div className="bg-gray-100 col-start-5 col-end-7 row-start-1 row-end-2">
          <div className="flex justify-between items-center mx-3 mt-3">
            <h1 className="text-sm font-semibold">Matched List</h1>
            <div className="flex items-center gap-x-5">
              <select className="bg-primaryColor text-white p-2 rounded-md text-xs">
                <option value="all" defaultChecked>
                  Total Users
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="w-full h-full flex justify-start items-center pl-2 pb-12">
            <Pichart data={genderData} colors={["#8B78B8", "#5E3FBE"]} />
            <div className="flex flex-col items-start justify-center ml-10 gap-y-4">
              <div className="flex items-center gap-x-2">
                <div className="w-5 h-5 bg-[#8B78B8]"></div>
                <p className="text-sm">Male</p>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="w-5 h-5 bg-[#5E3FBE]"></div>
                <p className="text-sm">Female</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Laungauge Pie Chart */}
        {/* <div className="bg-gray-100 col-start-5 col-end-7 row-start-2 row-end-3">
          <div className="flex justify-between items-center mx-3 mt-3">
            <h1 className="text-sm font-semibold">Matched List</h1>
            <div className="flex items-center gap-x-5">
              <select className="bg-primaryColor text-white p-2 rounded-md text-xs">
                <option value="all" defaultChecked>
                  JLPT
                </option>
                <option value="JLPT N4">N4</option>
                <option value="JLPT N5">N5</option>
                <option value="JLPT N3">N3</option>
                <option value="JLPT N2">N2</option>
                <option value="JLPT N1">N1</option>
              </select>
            </div>
          </div>
          <div className="w-full h-full flex justify-start items-center pl-2 pb-12">
            <Pichart
              data={languageData}
              colors={["#EAF6ED", "#C9EAD4", "#A9DEBA", "#67C587"]}
            />
            <div className="grid grid-cols-2 grid-flow-row ml-10 gap-4">
              <div className="flex items-center gap-x-2">
                <div className="w-5 h-5 bg-[#EAF6ED]"></div>
                <p>N1</p>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="w-5 h-5 bg-[#C9EAD4]"></div>
                <p>N2</p>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="w-5 h-5 bg-[#A9DEBA]"></div>
                <p>N3</p>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="w-5 h-5 bg-[#67C587]"></div>
                <p>N4</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Meeting */}
        <div className="bg-gray-100 col-span-3 col-start-1 row-start-3 row-end-5">
          <div className="w-full">
            <div className="flex items-start justify-between p-3">
              <div className="col-span-2 w-2/3 pb-4">
                <div className="flex items-center justify-between relative px-5">
                  <button className={`text-sm rounded-md px-2 py-1 absolute right-2 ${selectedDate === today ? 'bg-primaryColor text-white' : 'text-gray-500 bg-gray-200 hover:bg-gray-300'}`} onClick={() => { setSelectedDate(today); setActiveDate(today); selectedDate === today ? setActiveDate(today) : null }}>
                    {jp.todayMeetings} <span className={`ml-2 text-xs ${selectedDate === today ? 'text-white' : 'text-primaryColor'}`}>+{todayEvents.length}</span>
                  </button>
                  <h1 className="text-base font-semibold text-center my-2">
                    {selectedDate} {jp.meetings}
                  </h1>
                </div>
                <div className="w-full h-[62vh] overflow-y-auto border-r-2 border-gray-200">
                  {selectedDate === today ? (
                    todayEvents.map((event: Event, index: number) => {
                      return <EventListItem key={index} event={event} />;
                    })
                  ) : upcomingEvents[selectedDate] ? (
                    upcomingEvents[selectedDate].map((event: Event, index: number) => {
                      return <EventListItem key={index} event={event} />;
                    })
                  ) : (
                    <p className="text-center text-gray-500 mt-10">
                      No meetings today
                    </p>
                  )}
                </div>
                {todayEvents.length > 0 && (
                  <div className="text-end pt-3">
                    <button className="text-sm text-gray-500">
                      See More &gt;&gt;
                    </button>
                  </div>
                )}
              </div>
              <div className="w-1/3 pl-3 h-[67vh]">
                <h2 className="text-base font-semibold text-center my-2">今後の会議</h2>
                <div ref={scrollableRef} className="overflow-y-auto h-[62vh] relative">
                  {Array.from({ length: 30 }, (_, index) => {
                    const date = moment(new Date(today).setDate(new Date(today).getDate() + index + 1)).format('YYYY-MM-DD');
                    return (
                      <div
                        key={index}
                        className={`w-full h-10 rounded-md flex items-center justify-center mb-2 cursor-pointer bg-gray-200  ${activeDate === date ? 'bg-primaryColor text-white' : 'hover:bg-gray-300'}`}
                        onClick={() => {
                          setActiveDate(date);
                          setSelectedDate(date);
                        }}
                      >
                        {date}
                        {activeDate !== date && upcomingEvents[date] && upcomingEvents[date].length > 0 && (
                          <span className="text-xs text-gray-500 absolute right-8 text-primaryColor">
                            + {upcomingEvents[date].length}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Messages */}
        <div className="bg-gray-100 col-start-4 col-end-7 row-start-3 row-end-5">
          <h1 className="text-lg font-semibold mx-3 px-5 pt-5">
            {jp.newMessages}
          </h1>
          <div className="w-full h-[calc(100vh-300px)]  overflow-y-auto px-5">
            {chats.length > 0 ? (
              chats.map((chat, index) => (
                <div
                  key={index}
                  className="flex items-center p-2 gap-x-2 border-b-2 border-gray-300 overflow-hidden cursor-pointer hover:bg-gray-300"
                  onClick={() => handleChatClick(chat)}
                >
                  <img
                    src="https://via.placeholder.com/150"
                    alt="profile"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div
                    key={index}
                    className="flex items-start flex-col gap-x-2 w-full"
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <h1 className="text-sm font-semibold">
                        {chat.jobfinder_name}
                      </h1>
                      <p className="text-xs text-gray-500">
                        {moment(
                          chat.last_message_timestamp.toDate()
                        ).calendar()}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">{chat.last_message}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-10">{jp.noMessages}</p>
            )}
          </div>
          {chats.length > 0 && (
            <div className="text-end pt-2">
              <button className="text-sm text-gray-500">
                See More &gt;&gt;
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

const dashboardVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default DashboardScreen;
