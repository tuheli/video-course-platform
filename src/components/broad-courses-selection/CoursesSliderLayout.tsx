import { Box, Button, Paper, Stack } from '@mui/material';
import { CourseTopicHeading } from './CourseTopicHeading';
import { CoursesSliderOnly } from './CoursesSliderOnly';
import { useSelectedCourseTopicContext } from '../../hooks/useSelectedCourseTopicContext';
import { getTopic } from '../../../data/courseData';

export const CoursesSliderLayout = () => {
  const { topic } = useSelectedCourseTopicContext();

  const onClickExplore = () => {};

  const topicToShow = getTopic(topic);

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
