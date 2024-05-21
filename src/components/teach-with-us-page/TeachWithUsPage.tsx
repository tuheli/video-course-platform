import { Box } from '@mui/material';
import AppAppBar from '../appbar/AppAppBar';
import { TeachWithUsBanner } from './TeachWithUsBanner';
import { ReasonsToStart } from './ReasonsToStart';

export const TeachWithUsPage = () => {
  return (
    <>
      <AppAppBar />
      <TeachWithUsBanner />
      <Box
        sx={{
          py: 4,
        }}
      >
        <ReasonsToStart />
      </Box>
    </>
  );
};
