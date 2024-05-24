import { Box } from '@mui/material';
import { InstructorAppBar } from './InstructorAppBar';
import { JumpIntoCourseCreation } from '../course-creation/JumpIntoCourseCreation';
import { HelpfulResourcesHeader } from './HelpfulResourcesHeader';
import { CreateAnEngagingCourse } from '../create-an-engaging-course/CreateAnEngagingCourse';
import { PopularInstructorResources } from '../popular-instructor-resources/PopularInstructorResources';
import { AreYouReadyToBegin } from './AreYouReadyToBegin';
import { Footer } from '../footer/Footer';
import { useScrollToTop } from '../../hooks/useScrollToTop';

export const InstructorCoursesPage = () => {
  useScrollToTop();

  return (
    <>
      <InstructorAppBar />
      <Box
        sx={{
          pt: 8,
          pb: 4,
        }}
      >
        <JumpIntoCourseCreation />
      </Box>
      <Box
        sx={{
          pt: 4,
        }}
      >
        <HelpfulResourcesHeader />
      </Box>
      <Box
        sx={{
          pt: 8,
        }}
      >
        <CreateAnEngagingCourse />
      </Box>
      <Box
        sx={{
          py: 8,
        }}
      >
        <PopularInstructorResources />
      </Box>
      <Box
        sx={{
          pt: 8,
          pb: 16,
        }}
      >
        <AreYouReadyToBegin />
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
