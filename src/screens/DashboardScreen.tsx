
import { Grid, Box } from '@mui/material';
import Layout from '@/layouts/Layout';
import OverviewCard from '@/components/Dashboard/OverviewCard';
import UpcomingMeetingsCard from '@/components/Dashboard/UpcomingMeetingsCard';
import CalendarCard from '@/components/Dashboard/CalendarCard';
import RecentActivityCard from '@/components/Dashboard/RecentActivityCard';
const DashboardScreen = () => {
  return (
    <Layout>
    <Box sx={{ flexGrow: 1, padding: 3 }}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <OverviewCard />
      </Grid>
      <Grid item xs={12} md={6}>
        <UpcomingMeetingsCard />
      </Grid>
      <Grid item xs={12} md={6}>
        <CalendarCard />
      </Grid>
      <Grid item xs={12} md={6}>
        <RecentActivityCard />
      </Grid>
    </Grid>
  </Box>
  </Layout>
  )
}

export default DashboardScreen