import { Container, Stack, Typography } from '@mui/material';
import { CreateYourCourseButton } from '../course-creation/CreateYourCourseButton';

export const AreYouReadyToBegin = () => {
  return (
    <Container>
      <Stack
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Typography>Are you ready to begin?</Typography>
        <CreateYourCourseButton />
      </Stack>
    </Container>
  );
};
