import { Container, Stack, Typography } from '@mui/material';
import { CoursesSliderOnly } from '../broad-courses-selection/CoursesSliderOnly';
import { SelectedCourseTopicContext } from '../../contexts/SelectedCourseTopicContext';

export const LearnersAreViewingSlider = () => {
  return (
    <Container>
      <Stack
        sx={{
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h6">Learners are viewing</Typography>
        <SelectedCourseTopicContext.Provider
          value={{ topic: 'Python', changeTopic: () => null }}
        >
          <CoursesSliderOnly />
        </SelectedCourseTopicContext.Provider>
      </Stack>
    </Container>
  );
};
