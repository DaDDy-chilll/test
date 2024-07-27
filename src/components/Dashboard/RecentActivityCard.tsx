import { Card, CardContent, Typography, List, ListItem, ListItemText, Avatar, Box } from '@mui/material';

const activities = [
  { name: 'Mr Random Guy', date: 'Date/Time' },
  { name: 'Mr Random Guy', date: 'Date/Time' },
  // Add more entries as needed
];

const RecentActivityCard = () => {
  return (
    <Card sx={{ backgroundColor: '#2D2D2D', color: 'white', padding: 2 }}>
      <CardContent>
        <Typography variant="h6">မကြာသေးခင်စိတ်</Typography>
        <List>
          {activities.map((activity, index) => (
            <ListItem key={index}>
              <Avatar sx={{ bgcolor: '#3f51b5' }}>MR</Avatar>
              <Box ml={2}>
                <ListItemText primary={activity.name} secondary={activity.date} />
              </Box>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
