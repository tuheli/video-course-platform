import { Container, Paper, Stack, Typography } from '@mui/material';
import { CreateYourCourseButton } from './CreateYourCourseButton';

export const JumpIntoCourseCreation = () => {
  return (
    <Container>
      <Paper
        sx={{
          p: 6,
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography>Jump Into Course Creation</Typography>
          <CreateYourCourseButton />
        </Stack>
      </Paper>
    </Container>
  );
};
