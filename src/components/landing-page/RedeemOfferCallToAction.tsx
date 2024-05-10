import { Button, Stack, Typography } from '@mui/material';
import { SpecialOfferTimer } from './SpecialOfferTimer';

export const RedeemOfferCallToAction = () => {
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#eceb98',
        p: 2,
        gap: 2,
      }}
    >
      {/** Text on left side */}
      <Stack
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component="p"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
          }}
        >
          New-learner offer | Courses from €14.99. Click button to see savings.
        </Typography>
        <Typography
          variant="h6"
          component="span"
          sx={{ color: 'text.primary' }}
        >
          Ends in <SpecialOfferTimer />
        </Typography>
      </Stack>
      {/** Button on right side */}
      <Button variant="contained">Click to redeem</Button>
    </Stack>
  );
};
