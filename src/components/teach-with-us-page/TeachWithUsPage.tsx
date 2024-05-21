import { Box } from '@mui/material';
import AppAppBar from '../appbar/AppAppBar';
import { TeachWithUsBanner } from './TeachWithUsBanner';
import { ReasonsToStart } from './ReasonsToStart';
import { Statistics } from './Statistics';

export const TeachWithUsPage = () => {
  return (
    <>
      <AppAppBar />
      <TeachWithUsBanner />
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
    </>
  );
};
