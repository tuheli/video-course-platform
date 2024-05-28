import {
  Box,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { LightColoredRouterLink } from './LightColoredRouterLink';
import { WhatWillStudentsLearnInYourCourse } from './what-will-students-learn-in-your-course/WhatWillStudentsLearnInYourCourse';
import { CourseManagementSideBar } from './CourseManagementSideBar';
import { WhatAreTheCoursePrerequisites } from './what-are-the-course-prerequisites/WhatAreTheCoursePrerequisites';
import { WhoIsThisCourseFor } from './who-is-this-course-for/WhoIsThisCourseFor';

export const IntendedLearnersLayout = () => {
  return (
    <Container>
      <Stack
        sx={{
          flexDirection: 'row',
          gap: 2,
        }}
      >
        <CourseManagementSideBar />
        <Paper
          sx={{
            width: '100%',
            p: 0,
          }}
        >
          <Stack
            sx={{
              flexDirection: 'column',
              width: '100%',
              gap: 4,
            }}
          >
            <Box
              sx={{
                px: 4,
                pt: 4,
              }}
            >
              <Typography variant="h5">Intended learners</Typography>
            </Box>
            <Divider />
            <Stack
              sx={{
                flexDirection: 'column',
                pl: 4,
                pr: 12,
                gap: 4,
              }}
            >
              <Typography>
                The following descriptions will be publicly visible on your{' '}
                <LightColoredRouterLink to="">
                  Course Landing Page
                </LightColoredRouterLink>{' '}
                and will have a direct impact on your course performance. These
                descriptions will help learners decide if your course is right
                for them.
              </Typography>
              <WhatWillStudentsLearnInYourCourse />
              <WhatAreTheCoursePrerequisites />
              <WhoIsThisCourseFor />
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};
