import { Box, Button, Paper, Stack } from '@mui/material';
import { broadCoursesSelectionData } from './broadCoursesSelectionData';
import { CourseTopicHeading } from './CourseTopicHeading';
import { CoursesSliderOnly } from './CoursesSliderOnly';
import { useSelectedCourseTopicContext } from '../../hooks/useSelectedCourseTopicContext';

export const CoursesSliderLayout = () => {
  const { topic } = useSelectedCourseTopicContext();
  const topicToShow = broadCoursesSelectionData.find((p) => p.name === topic);

  const onClickExplore = () => {};

  if (!topicToShow) return null;

  return (
    <Paper
      sx={{
        padding: 3,
      }}
    >
      <Stack
        sx={{
          flexdirection: 'column',
          gap: 2,
        }}
      >
        <CourseTopicHeading
          heading={topicToShow.heading}
          description={topicToShow.description}
        />
        <Box>
          <Button variant="outlined" onClick={onClickExplore}>
            Explore {topicToShow.name}
          </Button>
        </Box>
        <Stack
          sx={{
            flexDirection: 'row',
          }}
        >
          <CoursesSliderOnly />
        </Stack>
      </Stack>
    </Paper>
  );
};
