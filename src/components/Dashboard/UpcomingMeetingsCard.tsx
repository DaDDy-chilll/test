import { Card, CardContent, Typography, List, ListItem, ListItemText, Link } from '@mui/material';

const meetings = [
  { name: 'Mr Random', date: '2024/9/25' },
  { name: 'Mrs Random', date: '2024/9/25' },
  { name: 'Mr Random', date: '2024/9/25' },
  { name: 'Mrs Random', date: '2024/9/25' },
  { name: 'Mr Random', date: '2024/9/25' },
  { name: 'Mrs Random', date: '2024/9/25' },
  // Add more entries as needed
];

const UpcomingMeetingsCard = () => {
  return (
    <Card sx={{ backgroundColor: '#2D2D2D', color: 'white', padding: 2 }}>
      <CardContent>
        <Typography variant="h6">အသစ်လျှောက်ထားသူများ</Typography>
        <List>
          {meetings.map((meeting, index) => (
            <ListItem key={index}>
              <ListItemText primary={meeting.name} secondary={meeting.date} />
            </ListItem>
          ))}
        </List>
        <Link href="#" color="inherit">
          See More
        </Link>
      </CardContent>
    </Card>
  );
};

export default UpcomingMeetingsCard;
