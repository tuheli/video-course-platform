import { Box } from '@mui/material';
import AppAppBar from '../appbar/AppAppBar';
import { ReasonsToStart } from './ReasonsToStart';
import { Statistics } from './Statistics';
import { Banner } from './Banner';
import { HowToBegin } from './HowToBegin';
import { CustomerStoriesBigImageVersion } from '../customer-stories/CustomerStoriesBigImageVersion';

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
      <Box
        sx={{
          py: 12,
        }}
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
          }}
        >
          <CustomerStoriesBigImageVersion />
        </Box>
      </Box>
    </>
  );
};
