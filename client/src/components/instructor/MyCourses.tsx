import { Box, Container, Stack, Typography } from '@mui/material';
import { SearchYourCourses } from './SearchYourCourses';
import { SelectCourseOrder } from './select-course-order/SelectCourseOrder';
import { NewCourseButton } from './NewCourseButton';
import { CourseDraft } from '../../features/courseDraftsSlice';
import { CourseDraftItem } from './coursedrafts/CourseDraftItem';

interface MyCoursesProps {
  courseDrafts: CourseDraft[];
}

export const MyCourses = ({ courseDrafts }: MyCoursesProps) => {
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
        <>
          {courseDrafts.map((courseDraft) => (
            <CourseDraftItem key={courseDraft.id} courseDraft={courseDraft} />
          ))}
        </>
      </Stack>
    </Container>
  );
};
