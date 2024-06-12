import { Container, Stack, Typography } from '@mui/material';
import { CoursesSlider } from '../broad-courses-selection/CoursesSlider';
import { getTopic } from '../../../data/courseData';

export const LearnersAreViewingSlider = () => {
  const topicName = 'Python';
  const topic = getTopic(topicName);

  if (!topic) return null;

  return (
    <Container>
      <Stack
        sx={{
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h5">Learners are viewing</Typography>
        <CoursesSlider topic={topic} isSliderInfinite={false} />
      </Stack>
    </Container>
  );
};
