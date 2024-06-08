import { Box } from '@mui/material';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { Heading } from './Heading';
import { CourseManagementAppBar } from '../course-management/CourseManagementAppBar';
import { CourseManagementPageLayout } from '../course-management/CourseManagementPageLayout';
import { Footer } from '../footer/Footer';
import { Description } from './Description';
import { Curriculum } from '../curriculum/Curriculum';
import { CurriculumV2 } from '../drag-and-drop-v2/CurriculumV2';

export const ManageCourseCurriculumPage = () => {
  useScrollToTop();

  return (
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
        // Always show scrollbar with + 1px
        // preventing undesired horizontal movement
        // when scrollbar appears with more content
        // being added to the page
        minHeight: 'calc(100vh + 1px)',
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
          <CurriculumV2 />
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
