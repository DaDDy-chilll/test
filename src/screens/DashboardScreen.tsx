import { useEffect, useRef, useMemo, useCallback } from "react";
import {
  LineCharts,
  Loading,
  EventListItem,
  ChatSkeleton,
  EventSkeleton,
} from "@/components";
import { jp } from "@/lang/jp";
import { motion } from "framer-motion";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { events } from "@/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useChat from "@/hooks/useChat";
import moment from "moment";
import useFetch from "@/hooks/useFetch";
import { apiRoutes } from "@/utils/apiRoutes";
import { Event, Chat } from "@/types/helperTypes";
import { useNavigate } from "react-router-dom";
import { QueryKey } from "@/utils/queryKey";
import { useDispatch } from "react-redux";
import { setTitle, setNotification } from "@/store";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import DefaultUser from "@/assets/icons/default_user.svg";
import { db } from "../firebaseConfig";
import RouteName from "@/navigations/routes";
import { query, where, collection, onSnapshot } from "firebase/firestore";
import { colors } from "@/constants/color";

const startOfYear = moment().startOf("year").format("YYYY-MM-DD");
const endOfYear = moment().endOf("year").format("YYYY-MM-DD");

const currentDate = moment().format("YYYY-MM-DD");
// const currentDate = "2024-10-07";
// const currentYear = moment().format("YYYY");
// const currentDay = moment().format("DD");

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
  const { notification } = useSelector((state: RootState) => state.navigation);
  const { chats, isLoading: isChatLoading } = useChat({
    id: user?.id,
    limit: 11,
  });
  const scrollableRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedDateData, setSelectedDateData] = useState<any>();
  const [hasTodayEvents, setHasTodayEvents] = useState<any>({
    date: "",
    events: null,
  });
  const { data: dashboardData, isLoading: isDashboardLoading } = useFetch({
    endpoint: `${
      apiRoutes.DASHBOARD
    }?start_date=${startOfYear.toString()}&end_date=${endOfYear.toString()}`,
    token: token as string,
    key: QueryKey.DASHBOARD,
  });

  const { data: interviewData, isLoading: isInterviewLoading } = useFetch({
    endpoint: `${apiRoutes.INTERVIEW}?start_date=${startOfYear}&end_date=${endOfYear}`,
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

  const data = useMemo(() => {
    if (!dashboardData) return [];

    return Object.entries(dashboardData?.data.matchings)
      .map(([key, value]) => {
        const [_, month] = key.split("-");
        const monthIndex = parseInt(month) - 1;
        return {
          name: `${monthNames[monthIndex].id} 月`,
          matched: value,
        };
      })
      .sort(
        (a, b) =>
          monthNames.findIndex((month) => month.name === a.name) -
          monthNames.findIndex((month) => month.name === b.name),
      );
  }, [dashboardData]);

  const handleChatClick = (chat: Chat) =>
    navigate(RouteName.CHAT, { state: chat });

  const handleSeeMore = () => navigate(RouteName.CHAT);

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
          };
        });
      },
    );
  }, []);

  useEffect(() => {
    if (upcomingInterviews) {
      Object.entries(upcomingInterviews).forEach(([key, value]) => {
        if (key === currentDate) {
          setHasTodayEvents({ date: key, events: coverInterviews(value) });
        }
      });
    }
  }, [upcomingInterviews, coverInterviews]);

  return (
    <>
      <Helmet>
        <title>{jp.dashboard} - Japan Job</title>
      </Helmet>
      {isDashboardLoading && (
        <Loading
          isLoading={isDashboardLoading}
          className="h-[calc(100vh-68px)]"
        />
      )}
      <motion.main
        variants={dashboardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className=" w-full h-[calc(100vh+10vh)] grid grid-cols-6 grid-rows-5 gap-2 p-2 overflow-hidden"
      >
        {/* Line Chart */}
        <section className="bg-gray-100 col-span-6 row-span-2">
          <div className="flex justify-between items-center mx-3 mt-3">
            <h1 className="text-lg font-semibold">{jp.matchList}</h1>
          </div>
          <div className="w-full h-full pr-10 pt-2 pb-16">
            <LineCharts data={data} />
          </div>
        </section>

        {/* Meeting */}
        <section className="bg-gray-100 col-span-3 col-start-1 row-start-3 row-end-6 overflow-hidden">
          <div className="w-full">
            <div className="flex items-start justify-between p-3">
              <div className="w-1/3 pl-3 h-[67vh]">
                <h2 className="text-base font-semibold text-center my-2">
                  今後の会議
                </h2>
                <div
                  ref={scrollableRef}
                  className="overflow-y-auto h-[62vh] relative"
                  tabIndex={0}
                >
                  {isInterviewLoading ? (
                    <div className="flex flex-col gap-y-2 w-full h-full items-start justify-start">
                      {Array.from({ length: 3 }, (_, index) => (
                        <EventSkeleton key={index} />
                      ))}
                    </div>
                  ) : (
                    upcomingInterviews &&
                    Object.entries(upcomingInterviews)
                      .sort((a, b) => {
                        return (
                          new Date(a[0]).getTime() - new Date(b[0]).getTime()
                        );
                      })
                      .map(([key, value], index: number) => {
                        return (
                          <div
                            key={index}
                            className={`w-full h-10 rounded-md flex items-center justify-center mb-2 cursor-pointer ${
                              key === selectedDate || key === currentDate
                                ? "bg-primaryColor text-white"
                                : currentDate > key
                                  ? "bg-gray-300 text-gray-400"
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
                      })
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
                  {isInterviewLoading ? (
                    <div className="flex flex-col gap-y-2 w-full h-full items-start justify-start">
                      {Array.from({ length: 3 }, (_, index) => (
                        <ChatSkeleton key={index} />
                      ))}
                    </div>
                  ) : selectedDateData ? (
                    selectedDateData.map((event: Event, index: number) => {
                      return <EventListItem key={index} event={event} />;
                    })
                  ) : hasTodayEvents.events ? (
                    hasTodayEvents.events.map((event: Event, index: number) => {
                      return <EventListItem key={index} event={event} />;
                    })
                  ) : (
                    <div className=" flex flex-col w-full  mt-10 items-center">
                      <div className="w-40 h-40 ">
                        <svg
                          fill={colors.third}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path d="M15.3568437,15 C15.7646155,15.4524132 16,16.046195 16,16.6740273 L16,18.5 C16,19.8807119 14.8807119,21 13.5,21 L4.5,21 C3.11928813,21 2,19.8807119 2,18.5 L2,16.6741582 C2,16.0462625 2.23543163,15.4524277 2.64327433,15 L2.5,15 C2.22385763,15 2,14.7761424 2,14.5 C2,14.2238576 2.22385763,14 2.5,14 L4.16159469,14 L6.20372283,12.860218 C5.46099525,12.1339918 5,11.1208315 5,10 C5,7.790861 6.790861,6 9,6 C11.209139,6 13,7.790861 13,10 C13,10.0851511 12.9973393,10.1696808 12.9920965,10.2535104 L13.5294677,9.70238819 C13.1955521,9.21872477 13,8.6321992 13,8 C13,6.34314575 14.3431458,5 16,5 C17.6568542,5 19,6.34314575 19,8 C19,8.63142186 18.8049285,9.21728235 18.4717634,9.70060362 L18.4756434,9.70454496 L20.2910569,11.5687647 C20.7456276,12.0355563 21,12.6613719 21,13.3129308 L21,14 L21.5,14 C21.7761424,14 22,14.2238576 22,14.5 C22,14.7761424 21.7761424,15 21.5,15 L15.3568437,15 L15.3568437,15 Z M13.8388411,14 L20,14 L20,13.3129308 C20,12.9219955 19.8473766,12.5465061 19.5746341,12.2664311 L17.7752165,10.4186373 C17.2781336,10.7840978 16.6642801,11 16,11 C15.3364952,11 14.7232995,10.7846015 14.2265245,10.4199164 L12.4260261,12.2664886 C12.2161243,12.4817616 12.1876639,12.5119114 12.1322325,12.5816619 C12.0367817,12.7017697 12.0030449,12.7911346 12.0001997,12.9735561 L13.8388411,14 Z M13.2430272,14.8126554 L10.9146921,13.5128341 C10.3460214,13.8234492 9.6936285,14 9,14 C8.30657563,14 7.65436264,13.8235531 7.08580996,13.5131083 L3.76895585,15.3643588 C3.29420285,15.6293348 3,16.1304646 3,16.6741582 L3,18.5 C3,19.3284271 3.67157288,20 4.5,20 L13.5,20 C14.3284271,20 15,19.3284271 15,18.5 L15,16.6740273 C15,16.130386 14.7058532,15.6292958 14.2311717,15.3642991 L13.5719516,14.9962814 C13.4392535,14.9800633 13.3226161,14.9118587 13.2430272,14.8126554 L13.2430272,14.8126554 Z M9,13 C10.6568542,13 12,11.6568542 12,10 C12,8.34314575 10.6568542,7 9,7 C7.34314575,7 6,8.34314575 6,10 C6,11.6568542 7.34314575,13 9,13 Z M16,10 C17.1045695,10 18,9.1045695 18,8 C18,6.8954305 17.1045695,6 16,6 C14.8954305,6 14,6.8954305 14,8 C14,9.1045695 14.8954305,10 16,10 Z"></path>{" "}
                          </g>
                        </svg>
                      </div>
                      <p className=" text-gray-500 mt-5">
                        {jp.noInterviewSchedule}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Messages */}
        <section className="bg-gray-100 col-start-4 col-end-7 row-start-3 row-end-6">
          <h1 className="text-lg font-semibold mx-3 px-5 pt-5">
            {jp.newMessages}
          </h1>
          <div
            className="w-full h-[calc(100vh-320px)]  overflow-y-auto px-5"
            tabIndex={0}
          >
            {isChatLoading ? (
              <div className="flex flex-col gap-y-2 w-full h-full items-start justify-start ">
                {Array.from({ length: 3 }, (_, index) => (
                  <div
                    key={index}
                    className="flex items-center w-full p-2 gap-x-2 border-b-2 border-gray-300 overflow-hidden cursor-pointer hover:bg-gray-300"
                  >
                    <ChatSkeleton />
                  </div>
                ))}
              </div>
            ) : chats.length > 0 ? (
              chats.slice(0, 10).map((chat, index) => {
                const profileImage = `https://api.japanjob.exbrainedu.com/v1/file/photo/${chat.jobfinder_profile_image}`;

                return (
                  <div
                    key={index}
                    className="flex items-center p-2 gap-x-2 border-b-2 border-gray-300 overflow-hidden cursor-pointer hover:bg-gray-300"
                    onClick={() => handleChatClick(chat)}
                  >
                    {chat.jobfinder_profile_image && profileImage ? (
                      <img
                        src={profileImage}
                        alt="profile"
                        width={50}
                        height={50}
                        className="rounded-full"
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <img
                        src={DefaultUser}
                        alt="profile"
                        width={50}
                        height={50}
                        className="rounded-full"
                        crossOrigin="anonymous"
                      />
                    )}

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
                            chat.last_message_timestamp.toDate(),
                          ).calendar()}
                        </p>
                      </div>
                      <p
                        className={`text-xs  ${
                          notification[chat.id] && notification[chat.id] > 0
                            ? "font-bold text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        {chat.last_message.length > 53
                          ? `${chat.last_message.slice(0, 50)}...`
                          : chat.last_message}
                      </p>
                    </div>
                    {notification[chat.id] && notification[chat.id] > 0 ? (
                      <div className=" rounded-full bg-primaryColor h-2 w-2"></div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col w-full  mt-16 items-center gap-y-5">
                <div className="w-32 h-32">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.0867 21.3877L13.7321 21.7697L13.0867 21.3877ZM13.6288 20.4718L12.9833 20.0898L13.6288 20.4718ZM10.3712 20.4718L9.72579 20.8539H9.72579L10.3712 20.4718ZM10.9133 21.3877L11.5587 21.0057L10.9133 21.3877ZM1.25 10.5C1.25 10.9142 1.58579 11.25 2 11.25C2.41421 11.25 2.75 10.9142 2.75 10.5H1.25ZM3.07351 15.6264C2.915 15.2437 2.47627 15.062 2.09359 15.2205C1.71091 15.379 1.52918 15.8177 1.68769 16.2004L3.07351 15.6264ZM7.78958 18.9915L7.77666 19.7413L7.78958 18.9915ZM5.08658 18.6194L4.79957 19.3123H4.79957L5.08658 18.6194ZM21.6194 15.9134L22.3123 16.2004V16.2004L21.6194 15.9134ZM16.2104 18.9915L16.1975 18.2416L16.2104 18.9915ZM18.9134 18.6194L19.2004 19.3123H19.2004L18.9134 18.6194ZM19.6125 2.7368L19.2206 3.37628L19.6125 2.7368ZM21.2632 4.38751L21.9027 3.99563V3.99563L21.2632 4.38751ZM4.38751 2.7368L3.99563 2.09732V2.09732L4.38751 2.7368ZM2.7368 4.38751L2.09732 3.99563H2.09732L2.7368 4.38751ZM9.40279 19.2098L9.77986 18.5615L9.77986 18.5615L9.40279 19.2098ZM13.7321 21.7697L14.2742 20.8539L12.9833 20.0898L12.4412 21.0057L13.7321 21.7697ZM9.72579 20.8539L10.2679 21.7697L11.5587 21.0057L11.0166 20.0898L9.72579 20.8539ZM12.4412 21.0057C12.2485 21.3313 11.7515 21.3313 11.5587 21.0057L10.2679 21.7697C11.0415 23.0767 12.9585 23.0767 13.7321 21.7697L12.4412 21.0057ZM10.5 2.75H13.5V1.25H10.5V2.75ZM21.25 10.5V11.5H22.75V10.5H21.25ZM7.8025 18.2416C6.54706 18.2199 5.88923 18.1401 5.37359 17.9265L4.79957 19.3123C5.60454 19.6457 6.52138 19.7197 7.77666 19.7413L7.8025 18.2416ZM1.68769 16.2004C2.27128 17.6093 3.39066 18.7287 4.79957 19.3123L5.3736 17.9265C4.33223 17.4951 3.50486 16.6678 3.07351 15.6264L1.68769 16.2004ZM21.25 11.5C21.25 12.6751 21.2496 13.5189 21.2042 14.1847C21.1592 14.8438 21.0726 15.2736 20.9265 15.6264L22.3123 16.2004C22.5468 15.6344 22.6505 15.0223 22.7007 14.2868C22.7504 13.5581 22.75 12.6546 22.75 11.5H21.25ZM16.2233 19.7413C17.4786 19.7197 18.3955 19.6457 19.2004 19.3123L18.6264 17.9265C18.1108 18.1401 17.4529 18.2199 16.1975 18.2416L16.2233 19.7413ZM20.9265 15.6264C20.4951 16.6678 19.6678 17.4951 18.6264 17.9265L19.2004 19.3123C20.6093 18.7287 21.7287 17.6093 22.3123 16.2004L20.9265 15.6264ZM13.5 2.75C15.1512 2.75 16.337 2.75079 17.2619 2.83873C18.1757 2.92561 18.7571 3.09223 19.2206 3.37628L20.0044 2.09732C19.2655 1.64457 18.4274 1.44279 17.4039 1.34547C16.3915 1.24921 15.1222 1.25 13.5 1.25V2.75ZM22.75 10.5C22.75 8.87781 22.7508 7.6085 22.6545 6.59611C22.5572 5.57256 22.3554 4.73445 21.9027 3.99563L20.6237 4.77938C20.9078 5.24291 21.0744 5.82434 21.1613 6.73809C21.2492 7.663 21.25 8.84876 21.25 10.5H22.75ZM19.2206 3.37628C19.7925 3.72672 20.2733 4.20752 20.6237 4.77938L21.9027 3.99563C21.4286 3.22194 20.7781 2.57144 20.0044 2.09732L19.2206 3.37628ZM10.5 1.25C8.87781 1.25 7.6085 1.24921 6.59611 1.34547C5.57256 1.44279 4.73445 1.64457 3.99563 2.09732L4.77938 3.37628C5.24291 3.09223 5.82434 2.92561 6.73809 2.83873C7.663 2.75079 8.84876 2.75 10.5 2.75V1.25ZM2.75 10.5C2.75 8.84876 2.75079 7.663 2.83873 6.73809C2.92561 5.82434 3.09223 5.24291 3.37628 4.77938L2.09732 3.99563C1.64457 4.73445 1.44279 5.57256 1.34547 6.59611C1.24921 7.6085 1.25 8.87781 1.25 10.5H2.75ZM3.99563 2.09732C3.22194 2.57144 2.57144 3.22194 2.09732 3.99563L3.37628 4.77938C3.72672 4.20752 4.20752 3.72672 4.77938 3.37628L3.99563 2.09732ZM11.0166 20.0898C10.8136 19.7468 10.6354 19.4441 10.4621 19.2063C10.2795 18.9559 10.0702 18.7304 9.77986 18.5615L9.02572 19.8582C9.07313 19.8857 9.13772 19.936 9.24985 20.0898C9.37122 20.2564 9.50835 20.4865 9.72579 20.8539L11.0166 20.0898ZM7.77666 19.7413C8.21575 19.7489 8.49387 19.7545 8.70588 19.7779C8.90399 19.7999 8.98078 19.832 9.02572 19.8582L9.77986 18.5615C9.4871 18.3912 9.18246 18.3215 8.87097 18.287C8.57339 18.2541 8.21375 18.2487 7.8025 18.2416L7.77666 19.7413ZM14.2742 20.8539C14.4916 20.4865 14.6287 20.2564 14.7501 20.0898C14.8622 19.936 14.9268 19.8857 14.9742 19.8582L14.2201 18.5615C13.9298 18.7304 13.7204 18.9559 13.5379 19.2063C13.3646 19.4441 13.1864 19.7468 12.9833 20.0898L14.2742 20.8539ZM16.1975 18.2416C15.7862 18.2487 15.4266 18.2541 15.129 18.287C14.8175 18.3215 14.5129 18.3912 14.2201 18.5615L14.9742 19.8582C15.0192 19.832 15.096 19.7999 15.2941 19.7779C15.5061 19.7545 15.7842 19.7489 16.2233 19.7413L16.1975 18.2416Z"
                      fill={colors.third}
                    />
                    <path
                      d="M8 11H8.009M11.991 11H12M15.991 11H16"
                      stroke={colors.third}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className=" text-gray-500 mt-1">{jp.noMessages}</p>
              </div>
            )}
          </div>
          {chats.length > 10 && (
            <div className="flex justify-end items-center px-3 py-1">
              <button
                className="hover:text-gray-900 text-gray-600 text-sm flex "
                onClick={handleSeeMore}
              >
                {jp.seeMore}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          )}
        </section>
      </motion.main>
    </>
  );
};

const dashboardVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default DashboardScreen;
