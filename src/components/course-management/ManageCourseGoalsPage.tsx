import Box from '@mui/material/Box';
import { CourseManagementAppBar } from './CourseManagementAppBar';
import { Footer } from '../footer/Footer';
import { IntendedLearnersLayout } from './IntendedLearnersLayout';
import { useScrollToTop } from '../../hooks/useScrollToTop';

export const ManageCourseGoalsPage = () => {
  useScrollToTop();

  return (
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
        minHeight: '100vh',
      }}
    >
      <CourseManagementAppBar />
      <Box
        sx={{
          pt: 14,
          pb: 8,
        }}
      >
        <IntendedLearnersLayout />
      </Box>
      <Box
        sx={{
          py: 4,
          bgcolor: 'background.dark',
          marginTop: 'auto',
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
};
