import { Box } from '@mui/material';
import AppAppBar from '../appbar/AppAppBar';
import { ReasonsToStart } from './ReasonsToStart';
import { Statistics } from './Statistics';
import { Banner } from './Banner';
import { HowToBegin } from './HowToBegin';

export const TeachWithUsPage = () => {
  return (
    <>
      <AppAppBar />
      <Banner />
      <Box
        sx={{
          py: 6,
        }}
      >
        <ReasonsToStart />
      </Box>
      <Box
        sx={{
          py: 6,
          bgcolor: 'background.tertiary',
        }}
      >
        <Statistics />
      </Box>
      <Box
        sx={{
          py: 6,
        }}
      >
        <HowToBegin />
      </Box>
    </>
  );
};
