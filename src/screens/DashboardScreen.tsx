

import Layout from '@/layouts/Layout';
import { motion } from 'framer-motion';
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
      className='bg-blue-500 w-full min-h-screen'>
        Dashboard
      </motion.div>
    </Layout>
  )
}


const dashboardVariants = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
};

export default DashboardScreen;