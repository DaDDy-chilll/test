import Layout from "@/layouts/Layout";
import { motion } from "framer-motion";
// import OverviewCard from '@/components/Dashboard/OverviewCard';
// import UpcomingMeetingsCard from '@/components/Dashboard/UpcomingMeetingsCard';
// import CalendarCard from '@/components/Dashboard/CalendarCard';
// import RecentActivityCard from '@/components/Dashboard/RecentActivityCard';
const DashboardScreen = () => {
  return (
    <Layout>
      <motion.div
        variants={dashboardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className=" w-full h-[calc(100vh-65px)] grid grid-cols-6 grid-rows-4 gap-2 p-2"
      >
        <div className="bg-red-500 col-span-4 row-span-2">1</div>
        <div className="bg-orange-500 col-start-5 col-end-7 row-start-2 row-end-3">2</div>
        <div className="bg-green-500 col-start-5 col-end-7 row-start-1 row-end-2">3</div>
        <div className="bg-blue-500 col-span-4 col-start-1 row-start-3 row-end-5">4</div>
        <div className="bg-yellow-500 col-start-5 col-end-7 row-start-3 row-end-5">5</div>
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
