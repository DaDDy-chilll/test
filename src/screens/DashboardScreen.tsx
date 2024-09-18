import LineCharts from "@/components/Dashboard/LineChart";
import Pichart from "@/components/Dashboard/Pichart";
import { jp } from "@/lang/jp";
import { motion } from "framer-motion";
import Calendar from "@/components/ui/calendar";
import { useState } from "react";
import EventListItem from "@/components/CalendarScreen/EventListItem";
import { events } from "@/constants";
import Loading from "@/components/ui/Loading";
// import OverviewCard from '@/components/Dashboard/OverviewCard';
// import UpcomingMeetingsCard from '@/components/Dashboard/UpcomingMeetingsCard';
// import CalendarCard from '@/components/Dashboard/CalendarCard';
// import RecentActivityCard from '@/components/Dashboard/RecentActivityCard';
const DashboardScreen = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
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

  return (
    <>
      {false && <Loading isLoading={false} className="h-[calc(100vh-68px)]" />}
      <motion.div
        variants={dashboardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className=" w-full h-[calc(100vh+40vh)] grid grid-cols-6 grid-rows-4 gap-2 p-2"
      >
        {/* Line Chart */}
        <div className="bg-gray-100 col-span-4 row-span-2">
          <div className="flex justify-between items-center mx-3 mt-3">
            <h1 className="text-lg font-semibold">Matched List</h1>
            <div className="flex items-center gap-x-5">
              <button className="p-2 rounded-md bg-primaryColor text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <p>July</p>
              <button className="p-2 rounded-md bg-primaryColor text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
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
          <div className="w-full h-full pt-2 pb-10">
            <LineCharts data={data} />
          </div>
        </div>

        {/* User Pie Chart */}
        <div className="bg-gray-100 col-start-5 col-end-7 row-start-1 row-end-2">
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
        </div>

        {/* Laungauge Pie Chart */}
        <div className="bg-gray-100 col-start-5 col-end-7 row-start-2 row-end-3">
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
        </div>

        {/* Calendar */}
        <div className="bg-gray-100 col-span-4 col-start-1 row-start-3 row-end-5">
          <div className="w-full ">
            <h1 className="text-lg font-semibold mx-3 px-5 pt-5">{jp.calendar}</h1>
            <div className="flex items-start justify-between p-3">
              <div className=" col-span-3 w-full">
                <Calendar />
              </div>
              <div className="col-span-2 w-full pb-4 border-l-2 border-gray-500">
                <h1 className="text-base font-semibold text-center my-2">{jp.meetings}</h1>
                <div className="w-full h-[calc(100vh-360px)] overflow-y-auto ">
                {
                events.map((event,index) => {
                  return <EventListItem key={index} event={event} />
                })
              }
                </div>
                <div className="text-end pt-3">
                  <button className="text-sm text-gray-500">See More &gt;&gt;</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Messages */}
        <div className="bg-gray-100 col-start-5 col-end-7 row-start-3 row-end-5">
          <h1 className="text-lg font-semibold mx-3 px-5 pt-5">{jp.newMessages}</h1>
          <div className="w-full h-[calc(100vh-300px)]  overflow-y-auto px-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-start flex-col gap-x-2 w-full py-2 border-b-2 border-gray-500">
                <div className="flex items-center justify-between w-full mb-3">
                  <h1 className="text-sm font-semibold">Mr Random Guy</h1>
                  <p className="text-sm text-gray-500">Date/Time</p>
                </div>
                <p className="text-sm text-gray-500">lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
              </div>
            ))}
          </div>
          <div className="text-end pt-2">
                  <button className="text-sm text-gray-500">See More &gt;&gt;</button>
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
