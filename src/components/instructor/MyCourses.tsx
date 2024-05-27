import { Box, Container, Stack, Typography } from '@mui/material';
import { SearchYourCourses } from './SearchYourCourses';
import { SelectCourseOrder } from './select-course-order/SelectCourseOrder';
import { NewCourseButton } from './NewCourseButton';
import { CourseDraftItems } from './coursedrafts/CourseDraftItems';

export const MyCourses = () => {
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
        <CourseDraftItems />
      </Stack>
    </Container>
  );
};
