import { Box } from '@mui/material';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { Heading } from './Heading';
import { CourseManagementAppBar } from '../course-management/CourseManagementAppBar';
import { CourseManagementPageLayout } from '../course-management/CourseManagementPageLayout';
import { Footer } from '../footer/Footer';
import { Description } from './Description';
import { Curriculum } from '../curriculum/Curriculum';
import { FetchCourseDrafts } from '../utility/FetchCourseDrafts';
import { SaveCurriculumOnUnmount } from '../utility/SaveCurriculumOnUnmount';

// NOTE: With strict mode on,
// curriculum save on unmount is called
// on initial render, not only on unmount.

export const ManageCourseCurriculumPage = () => {
  useScrollToTop();

  return (
    <>
      <FetchCourseDrafts />
      <SaveCurriculumOnUnmount />
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
    </>
  );
};
