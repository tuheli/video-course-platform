import Box from '@mui/material/Box';
import { CourseManagementAppBar } from './CourseManagementAppBar';
import { Footer } from '../footer/Footer';

export const ManageCourseGoalsPage = () => {
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
