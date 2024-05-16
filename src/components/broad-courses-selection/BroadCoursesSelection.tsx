import { Container } from '@mui/material';
import { Heading } from './Heading';
import { RenderingCourseTopicContextProvider } from './RenderingCourseTopicContextProvider';

export const BroadCoursesSelection = () => {
  return (
    <Container
      sx={{
        mt: 10,
      }}
    >
      <Heading />
      <RenderingCourseTopicContextProvider />
    </Container>
  );
};
