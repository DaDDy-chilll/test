import { useEffect, useRef, useMemo } from "react";
import { LineCharts, Loading, EventListItem } from "@/components";
import { jp } from "@/lang/jp";
import { motion } from "framer-motion";
// import { events } from "@/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useChat from "@/hooks/useChat";
import moment from "moment";
import useFetch from "@/hooks/useFetch";
import { apiRoutes } from "@/utils/apiRoutes";
import { format } from "date-fns";
import { Event, Chat } from "@/types/helperTypes";
import { useNavigate } from "react-router-dom";
import { QueryKey } from "@/utils/queryKey";
import { useDispatch } from "react-redux";
import { setTitle } from "@/store";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  query,
  where,
  addDoc,
  collection,
  orderBy,
  Timestamp,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const startOfYear = moment().startOf("year").format("YYYY-MM-DD");
const endOfYear = moment().endOf("year").format("YYYY-MM-DD");
const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");
const TODAY = moment().format('YYYY-MM-DD');
const currentYear = moment().format("YYYY");
const currentDay = moment().format("DD");

// const TODAY = "2024-11-03";
const monthNames = [
{
  id: 1,
  name: "January",
},
{
  id: 2,
  name: "February",
},
{
  id: 3,
  name: "March",
},
{
  id: 4,
  name: "April",
},
{
  id: 5,
  name: "May",
},
{
  id: 6,
  name: "June",
},
{
  id: 7,
  name: "July",
},
{
  id: 8,
  name: "August",
}
,{
  id: 9,
  name: "September",
},
{
  id: 10,
  name: "October",
},
{
  id: 11,
  name: "November",
},
{
  id: 12,
  name: "December",
}
];

const DashboardScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const { chats, isLoading: isChatLoading } = useChat({ id: user?.id });
  const scrollableRef = useRef<HTMLDivElement>(null);
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const [unreadCounts, setUnreadCounts] = useState<{ [key: string]: number }>(
    {}
  );
  const [selectedMonth,setSelectedMonth] = useState<number | string>(TODAY);
  const { data: dashboardData, isLoading: isDashboardLoading } = useFetch({
    endpoint: `${
      apiRoutes.DASHBOARD
    }?start_date=${startOfYear.toString()}&end_date=${endOfYear.toString()}`,
    token: token as string,
    key: QueryKey.DASHBOARD,
  });
  const { data: interviewData, isLoading: isInterviewLoading } = useFetch({
    endpoint: `${
      apiRoutes.INTERVIEW
    }?start_date=${setSelectedMonth}-01&end_date=${selectedMonth}30`,
    token: token as string,
    key: QueryKey.INTERVIEW,
    enabled:!!selectedMonth
  });


  console.log(interviewData, startOfMonth, endOfMonth);

  useEffect(() => {
    dispatch(setTitle(jp.dashboard));

    const checkForScrollbar = () => {
      if (scrollableRef.current) {
        const hasScrollbar =
          scrollableRef.current.scrollHeight >
          scrollableRef.current.clientHeight;
        scrollableRef.current.classList.toggle("pr-3", hasScrollbar);
      }
    };

    checkForScrollbar();
    window.addEventListener("resize", checkForScrollbar);

    return () => {
      window.removeEventListener("resize", checkForScrollbar);
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
      date: format(
        new Date(new Date().setDate(new Date().getDate() + 1)),
        "yyyy-MM-dd"
      ),
      description: "Discuss project updates and next steps",
    },
    {
      id: 2,
      title: "Client Call",
      date: format(
        new Date(new Date().setDate(new Date().getDate() + 1)),
        "yyyy-MM-dd"
      ),
      description: "Review project requirements with the client",
    },
    {
      id: 3,
      title: "Project Planning",
      date: format(
        new Date(new Date().setDate(new Date().getDate() + 1)),
        "yyyy-MM-dd"
      ),
      description: "Plan the next phase of the project",
    },
    {
      id: 4,
      title: "Design Review",
      date: format(
        new Date(new Date().setDate(new Date().getDate() + 1)),
        "yyyy-MM-dd"
      ),
      description: "Review the latest design mockups",
    },
    {
      id: 5,
      title: "Code Review",
      date: format(
        new Date(new Date().setDate(new Date().getDate() + 1)),
        "yyyy-MM-dd"
      ),
      description: "Review the latest code changes",
    },
    {
      id: 6,
      title: "Marketing Meeting",
      date: format(
        new Date(new Date().setDate(new Date().getDate() + 1)),
        "yyyy-MM-dd"
      ),
      description: "Discuss marketing strategies",
    },
    {
      id: 7,
      title: "Sales Call",
      date: format(
        new Date(new Date().setDate(new Date().getDate() + 1)),
        "yyyy-MM-dd"
      ),
      description: "Call with potential client",
    },
  ];

  // TODO: remove this
  // Sample data for upcoming events
  const upcomingEvents = Array.from({ length: 30 }, (_, index) => {
    const date = format(
      new Date(new Date().setDate(new Date().getDate() + index + 1)),
      "yyyy-MM-dd"
    );
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

  const data = useMemo(() => {
    if (!dashboardData) return [];

    return Object.entries(dashboardData?.data.matchings)
      .map(([key, value]) => {
        const [year, month] = key.split("-");
        const monthIndex = parseInt(month) - 1;
        return {
          name: monthNames[monthIndex].name,
          matched: value,
        };
      })
      .sort((a, b) => monthNames.findIndex(month => month.name === a.name) - monthNames.findIndex(month => month.name === b.name));
  }, [dashboardData]);

  const handleChatClick = (chat: Chat) => navigate("/chat", { state: chat });

  useEffect(() => {
    const messageListeners: any[] = [];

    chats.forEach((chat) => {
      const messagesRef = collection(db, "messages");

      const q = query(
        messagesRef,
        where("chat_id", "==", chat.id),
        where("sender_id", "!=", Number(`2${user?.id}`)),
        where("read", "==", false)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const unreadCount = snapshot.docs.length;
        console.log("chat.id", chat.id);
        console.log("unreadCount1", unreadCount);

        setUnreadCounts((prev) => ({
          ...prev,
          [chat.id]: unreadCount,
        }));
      });
      console.log("unreadCount", unreadCounts);

      messageListeners.push(unsubscribe);
    });

    return () => {
      messageListeners.forEach((unsubscribe) => unsubscribe());
    };
  }, [chats, user?.id]);

  useEffect(() => {
    console.log(`${selectedMonth}-01`)
  },[selectedMonth])

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
       
        {/* Meeting */}
        <div className="bg-gray-100 col-span-3 col-start-1 row-start-3 row-end-5 overflow-hidden">
          <div className="w-full">
            <div className="flex items-start justify-between p-3">
              <div className="col-span-2 w-2/3 pb-4">
                <div className="flex items-center justify-between relative px-5">
                  <button
                    className={`text-sm rounded-md px-2 py-1 absolute right-2 ${
                      selectedDate === today
                        ? "bg-primaryColor text-white"
                        : "text-gray-500 bg-gray-200 hover:bg-gray-300"
                    }`}
                    onClick={() => {
                      setSelectedDate(today);
                      setActiveDate(today);
                      selectedDate === today ? setActiveDate(today) : null;
                    }}
                  >
                    {jp.todayMeetings}{" "}
                    <span
                      className={`ml-2 text-xs ${
                        selectedDate === today
                          ? "text-white"
                          : "text-primaryColor"
                      }`}
                    >
                      +{todayEvents.length}
                    </span>
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
                    upcomingEvents[selectedDate].map(
                      (event: Event, index: number) => {
                        return <EventListItem key={index} event={event} />;
                      }
                    )
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
                <h2 className="text-base font-semibold text-center my-2">
                  今後の会議
                </h2>
                <div
                  ref={scrollableRef}
                  className="overflow-y-auto h-[62vh] relative"
                >
                  {monthNames.map((month, index) => (
                    <div
                      key={index}
                      className={`w-full h-10 rounded-md flex items-center justify-center mb-2 cursor-pointer bg-gray-200  ${
                        activeDate === month.name
                          ? "bg-primaryColor text-white"
                          : "hover:bg-gray-300"
                      }`}
                      onClick={() => {
                        setSelectedMonth(`${currentYear}-${month.id}`)
                        // setActiveDate(date);
                        // setSelectedDate(date);
                      }}
                    >
                      {month.name}
                      {/* {activeDate !== date &&
                          upcomingEvents[date] &&
                          upcomingEvents[date].length > 0 && (
                            <span className="text-xs text-gray-500 absolute right-8 text-primaryColor">
                              + {upcomingEvents[date].length}
                            </span>
                          )} */}
                    </div>
                  ))}
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
                  {unreadCounts[chat.id] > 0 && (
                    <div className=" rounded-full bg-primaryColor h-2 w-2"></div>
                  )}
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
