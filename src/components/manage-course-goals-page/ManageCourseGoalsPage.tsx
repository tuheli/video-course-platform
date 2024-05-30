import { Box } from '@mui/material';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { CourseManagementAppBar } from '../course-management/CourseManagementAppBar';
import { CourseManagementPageLayout } from '../course-management/CourseManagementPageLayout';
import { Heading } from './Heading';
import { Description } from './Description';
import { WhatWillStudentsLearnInYourCourse } from './what-will-students-learn-in-your-course/WhatWillStudentsLearnInYourCourse';
import { WhatAreTheCoursePrerequisites } from './what-are-the-course-prerequisites/WhatAreTheCoursePrerequisites';
import { WhoIsThisCourseFor } from './who-is-this-course-for/WhoIsThisCourseFor';
import { Footer } from '../footer/Footer';

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
        <CourseManagementPageLayout heading={<Heading />}>
          <Description />
          <WhatWillStudentsLearnInYourCourse />
          <WhatAreTheCoursePrerequisites />
          <WhoIsThisCourseFor />
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
