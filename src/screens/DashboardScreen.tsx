import LineCharts from "@/components/Dashboard/LineChart";
import Pichart from "@/components/Dashboard/Pichart";
import Layout from "@/layouts/Layout";
import { motion } from "framer-motion";
// import OverviewCard from '@/components/Dashboard/OverviewCard';
// import UpcomingMeetingsCard from '@/components/Dashboard/UpcomingMeetingsCard';
// import CalendarCard from '@/components/Dashboard/CalendarCard';
// import RecentActivityCard from '@/components/Dashboard/RecentActivityCard';
const DashboardScreen = () => {
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
    <Layout>
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

        <div className="bg-gray-300 col-start-5 col-end-7 row-start-1 row-end-2">
        <div className="flex justify-between items-center mx-3 mt-3">
            <h1 className="text-sm font-semibold">Matched List</h1>
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
              <p className="text-sm">July</p>
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
         <div className="w-full h-full flex items-center justify-start">
         <Pichart data={genderData} colors={["#8B78B8", "#5E3FBE"]} />
          <div className="">
            <h1>male</h1>
          </div>
         </div>
        </div>
        <div className="bg-gray-300 col-start-5 col-end-7 row-start-2 row-end-3">
          <Pichart
            data={languageData}
            colors={["#EAF6ED", "#C9EAD4", "#A9DEBA", "#67C587"]}
          />
        </div>
        <div className="bg-gray-300 col-span-4 col-start-1 row-start-3 row-end-5">
          4
        </div>
        <div className="bg-gray-300 col-start-5 col-end-7 row-start-3 row-end-5">
          5
        </div>
      </motion.div>
    </Layout>
  );
};

const dashboardVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default DashboardScreen;
