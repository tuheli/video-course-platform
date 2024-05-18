import { Container } from '@mui/material';
import { Heading } from './Heading';
import { RenderingCourseTopicContextProvider } from './RenderingCourseTopicContextProvider';

export const BroadCoursesSelection = () => {
  return (
    <Container>
      <Heading />
      <RenderingCourseTopicContextProvider />
    </Container>
  );
};
