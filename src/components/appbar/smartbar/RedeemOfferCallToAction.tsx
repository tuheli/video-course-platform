import { Button, Stack, Typography } from '@mui/material';
import { SpecialOfferTimer } from './SpecialOfferTimer';
import { useAppDispatch } from '../../../app/hooks';
import { redeemed } from '../../../features/offerSlice';

export const RedeemOfferCallToAction = () => {
  const dispatch = useAppDispatch();

  const onClickRedeem = () => {
    dispatch(redeemed());
  };

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
        <Stack
          sx={{
            flexDirection: 'row',
          }}
        >
          <Typography
            component="span"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
            }}
          >
            New-learner offer
          </Typography>
          <Typography
            component="span"
            sx={{
              color: 'text.primary',
              pl: 0.5,
            }}
          >
            | Courses from €14.99. Click button to see savings.
          </Typography>
        </Stack>
        <Typography
          variant="h6"
          component="span"
          sx={{ color: 'text.primary' }}
        >
          Ends in <SpecialOfferTimer />.
        </Typography>
      </Stack>
      {/** Button on right side */}
      <Button variant="contained" color="secondary" onClick={onClickRedeem}>
        Click to redeem
      </Button>
    </Stack>
  );
};
