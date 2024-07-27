import { Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';

const OverviewCard = () => {
  return (
    <Card sx={{ backgroundColor: '#2D2D2D', color: 'white', padding: 2 }}>
      <CardContent className='flex justify-between'>
        <div className='space-y-3'>
        <Typography variant="h6">သင့်လျှော်သောလျှောက်ထားသူ စုစုပေါင်း</Typography>
        <div className='space-y-2'>
            <div className='flex space-x-8'>
            <Typography>ယနေ့ပြောင်းလဲမှု</Typography>
            <Typography>30</Typography>
            </div>
            <div className='flex space-x-4'>
            <Typography>စုစုပေါင်းပြောင်းလဲမှု</Typography>
            <Typography>30</Typography>
            </div>
          </div>
          </div>
          <Box display="flex" alignItems="center">
            <TrendingUp fontSize="large" />
            <Typography variant="h3" ml={2}>777</Typography>
          </Box>
       
      
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
