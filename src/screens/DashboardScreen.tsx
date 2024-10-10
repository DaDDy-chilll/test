import { useEffect, useRef, useMemo, useCallback } from "react";
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
import DefaultUser from "@/assets/icons/default_user.svg"
import { db } from "../firebaseConfig";
import RouteName from "@/navigations/routes";
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


const startOfYear = moment().startOf("year").format("YYYY-MM-DD");
const endOfYear = moment().endOf("year").format("YYYY-MM-DD");

const currentDate = moment().format("YYYY-MM-DD");
// const currentDate = "2024-10-07";
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
  },
  {
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
  },
];

const DashboardScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const { chats, isLoading: isChatLoading } = useChat({ id: user?.id });
  const scrollableRef = useRef<HTMLDivElement>(null);
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedDateData, setSelectedDateData] = useState<any>();
  const [unreadCounts, setUnreadCounts] = useState<{ [key: string]: number }>(
    {}
  );
  const [hasTodayEvents,setHasTodayEvents] = useState<any>({date:'',events:null});
  // const [selectedMonth,setSelectedMonth] = useState<number | string>();
  // const selectedMonth = useRef<string>(TODAY);
  const { data: dashboardData, isLoading: isDashboardLoading } = useFetch({
    endpoint: `${
      apiRoutes.DASHBOARD
    }?start_date=${startOfYear.toString()}&end_date=${endOfYear.toString()}`,
    token: token as string,
    key: QueryKey.DASHBOARD,
  });

  const {
    data: interviewData,
    isLoading: isInterviewLoading,
    refetch: refetchInterviewData,
  } = useFetch({
    endpoint: `${apiRoutes.INTERVIEW}?start_date=${currentDate}&end_date=${endOfYear}`,
    token: token as string,
    key: QueryKey.INTERVIEW,
  });

  const upcomingInterviews = interviewData?.data;


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

  const today = format(new Date(), "yyyy-MM-dd");

  const data = useMemo(() => {
    if (!dashboardData) return [];

    return Object.entries(dashboardData?.data.matchings)
      .map(([key, value]) => {
        const [year, month] = key.split("-");
        const monthIndex = parseInt(month) - 1;
        return {
          name: `${monthNames[monthIndex].id} 月`,
          matched: value,
        };
      })
      .sort(
        (a, b) =>
          monthNames.findIndex((month) => month.name === a.name) -
          monthNames.findIndex((month) => month.name === b.name)
      );
  }, [dashboardData]);

  const handleChatClick = (chat: Chat) => navigate(RouteName.CHAT, { state: chat });

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

        setUnreadCounts((prev) => ({
          ...prev,
          [chat.id]: unreadCount,
        }));
      });

      messageListeners.push(unsubscribe);
    });

    return () => {
      messageListeners.forEach((unsubscribe) => unsubscribe());
    };
  }, [chats, user?.id]);


  const coverInterviews = useCallback(
    (data: any) => {
      if (!data) return [];
      return Object.entries(data as any[]).flatMap(([date, interviews]) => {
        return Object.entries(interviews as Record<string, any>).map(
          ([key, value]) => {
            return {
              name: key,
              user_photo: value[0].user_photo,
              start_time: value[0].start_time,
              end_time: value[0].end_time,
              job_title: value[0].job_title,
            };
          }
        );
      });
    },
    [data]
  );

useEffect(()=>{
  if(upcomingInterviews){
    Object.entries(upcomingInterviews).forEach(([key,value])=>{
      if(key === currentDate){
        setHasTodayEvents({date:key,events:coverInterviews(value)})
      }
    })
  }
},[upcomingInterviews])



  return (
    <>
      <Helmet>
        <title>{jp.dashboard} - Japan Job</title>
      </Helmet>
      {(isDashboardLoading || isChatLoading || isInterviewLoading) && (
        <Loading
          isLoading={isDashboardLoading || isChatLoading || isInterviewLoading}
          className="h-[calc(100vh-68px)]"
        />
      )}
      <motion.div
        variants={dashboardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className=" w-full h-[calc(100vh+10vh)] grid grid-cols-6 grid-rows-5 gap-2 p-2 overflow-hidden"
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
        <div className="bg-gray-100 col-span-3 col-start-1 row-start-3 row-end-6 overflow-hidden">
          <div className="w-full">
            <div className="flex items-start justify-between p-3">
              <div className="w-1/3 pl-3 h-[67vh]">
                <h2 className="text-base font-semibold text-center my-2">
                  今後の会議
                </h2>
                <div
                  ref={scrollableRef}
                  className="overflow-y-auto h-[62vh] relative"
                >
                  {upcomingInterviews &&
                    Object.entries(upcomingInterviews).map(
                      ([key, value], index: number) => {
                        return (
                          <div
                            key={index}
                            className={`w-full h-10 rounded-md flex items-center justify-center mb-2 cursor-pointer ${
                              key === selectedDate || key === currentDate
                                ? "bg-primaryColor text-white"
                                : "bg-gray-200 text-secondaryColor"
                            }`}
                            onClick={() => {
                              setSelectedDate(key);
                              setSelectedDateData(coverInterviews(value));
                            }}
                          >
                            {key}
                          </div>
                        );
                      }
                    )}
                </div>
              </div>
              <div className="col-span-2 w-2/3 pb-4">
                <div className="flex items-center justify-between relative px-5">
                  <h1 className="text-base font-semibold text-center my-2">
                    {selectedDate || currentDate} {jp.meetings}
                  </h1>
                </div>
                <div className="w-full h-[62vh] overflow-y-auto">
                  { selectedDateData ? (
                    selectedDateData.map((event: Event, index: number) => {
                      return <EventListItem key={index} event={event} />;
                    })
                  ) :  hasTodayEvents.events  ? (
                    hasTodayEvents.events.map((event: Event, index: number) => {
                      return <EventListItem key={index} event={event} />;
                    })
                    
                    ) :
                    <p className="text-center text-gray-500 mt-10">
                     {jp.noInterviewSchedule}
                    </p>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Messages */}
        <div className="bg-gray-100 col-start-4 col-end-7 row-start-3 row-end-6">
          <h1 className="text-lg font-semibold mx-3 px-5 pt-5">
            {jp.newMessages}
          </h1>
          <div className="w-full h-[calc(100vh-300px)]  overflow-y-auto px-5">
            {chats.length > 0 ? (
              chats.map((chat, index) => {
                const profileImage = `https://api.japanjob.exbrainedu.com/v1/file/photo/${chat.jobfinder_profile_image}`;

                return(
                  <div
                  key={index}
                  className="flex items-center p-2 gap-x-2 border-b-2 border-gray-300 overflow-hidden cursor-pointer hover:bg-gray-300"
                  onClick={() => handleChatClick(chat)}
                >
                  {
                    chat.jobfinder_profile_image && profileImage ? (
                      <img
                      src={profileImage}
                      alt="profile"
                      width={50}
                      height={50}
                      className="rounded-full"
                      crossOrigin="anonymous"
                    />
                    ) :(
                      <img
                      src={DefaultUser}
                      alt="profile"
                      width={50}
                      height={50}
                      className="rounded-full"
                      crossOrigin="anonymous"
                    />
                    )
                  }
               
                    
                    
                 
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
                )
              })
            ) : (
              <p className="text-center text-gray-500 mt-10">{jp.noMessages}</p>
            )}
          </div>
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
