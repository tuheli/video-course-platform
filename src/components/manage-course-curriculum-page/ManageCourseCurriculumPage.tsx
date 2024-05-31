import { Box } from '@mui/material';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { Heading } from './Heading';
import { CourseManagementAppBar } from '../course-management/CourseManagementAppBar';
import { CourseManagementPageLayout } from '../course-management/CourseManagementPageLayout';
import { Footer } from '../footer/Footer';
import { Description } from './Description';
import { Curriculum } from '../curriculum/Curriculum';

export const ManageCourseCurriculumPage = () => {
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
        <CourseManagementPageLayout heading={<Heading />}>
          <Description />
          <Curriculum />
        </CourseManagementPageLayout>
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
