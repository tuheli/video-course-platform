import { Box, Container, Stack, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { JumpIntoCourseCreation } from '../course-creation/JumpIntoCourseCreation';
import { SearchYourCourses } from './SearchYourCourses';
import { SelectCourseOrder } from './select-course-order/SelectCourseOrder';
import { NewCourseButton } from './NewCourseButton';
import { CourseDraftItems } from './coursedrafts/CourseDraftItems';

export const MyCourses = () => {
  const myEmail = useAppSelector((state) => state.me.user?.credentials.email);

  const areCourseDraftsVisible =
    useAppSelector((state) => state.courseDrafts).filter(
      ({ creatorEmail }) => myEmail === creatorEmail
    ).length > 0;

  return (
    <Container>
      <Stack
        sx={{
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Typography variant="h4">Courses</Typography>
        <Stack
          sx={{
            flexDirection: 'row',
            gap: 4,
          }}
        >
          <SearchYourCourses />
          <SelectCourseOrder />
          <Box
            sx={{
              marginLeft: 'auto',
            }}
          >
            <NewCourseButton />
          </Box>
        </Stack>
        {areCourseDraftsVisible && <CourseDraftItems />}
        {!areCourseDraftsVisible && <JumpIntoCourseCreation />}
      </Stack>
    </Container>
  );
};
