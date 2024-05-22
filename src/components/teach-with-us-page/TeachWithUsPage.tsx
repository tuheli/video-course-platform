import { Box } from '@mui/material';
import AppAppBar from '../appbar/AppAppBar';
import { ReasonsToStart } from './ReasonsToStart';
import { Statistics } from './Statistics';
import { Banner } from './Banner';
import { HowToBegin } from './HowToBegin';
import { CustomerStoriesBigImageVersion } from '../customer-stories/CustomerStoriesBigImageVersion';
import { Footer } from '../footer/Footer';
import { BecomeAnInstructorVariant } from '../become-an-instructor/BecomeAnInstructorVariant';
import { YouWontHaveToDoItAlone } from './YouWontHaveToDoItAlone';
import { useScrollToTop } from '../../hooks/useScrollToTop';

export const TeachWithUsPage = () => {
  useScrollToTop();

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
          py: 6,
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
      <Box
        sx={{
          py: 6,
        }}
      >
        <YouWontHaveToDoItAlone />
      </Box>
      <Box
        sx={{
          py: 8,
          bgcolor: 'background.paper',
        }}
      >
        <BecomeAnInstructorVariant />
      </Box>
      <Box
        sx={{
          py: 4,
          bgcolor: 'background.dark',
        }}
      >
        <Footer />
      </Box>
    </>
  );
};
