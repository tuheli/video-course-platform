import { Container, Stack, Typography } from '@mui/material';
import { broadCoursesSelectionData } from './broadCoursesSelectionData';
import { BroadCoursesSelectionItem } from './BroadCoursesSelectionItem';

// NOTE: Margin top is for developing. Remove it later.

export const BroadCoursesSelection = () => {
  const courseItems = broadCoursesSelectionData[0].items;

  return (
    <Container
      sx={{
        mt: 16,
      }}
    >
      <Stack
        sx={{
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4">A broad selection of courses</Typography>
        <Typography
          variant="body1"
          sx={{
            py: 1,
            mb: 4,
          }}
        >
          Choose from over 210,000 online video courses with new additions
          published every month
        </Typography>
        <Stack
          sx={{
            flexDirection: 'row',
            gap: 2,
          }}
        >
          <BroadCoursesSelectionItem courseItem={courseItems[0]} />
          <BroadCoursesSelectionItem courseItem={courseItems[1]} />
          <BroadCoursesSelectionItem courseItem={courseItems[2]} />
        </Stack>
      </Stack>
    </Container>
  );
};
