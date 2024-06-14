import { Container, Stack, Typography } from '@mui/material';
import { Step4Items } from './Step4Items';
import { Notification } from '../../../notification/Notification';

export const Step4 = () => {
  return (
    <>
      <Notification />
      <Container>
        <Stack
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Typography variant="h4">
            How much time can you spend creating your course per week?
          </Typography>
          <Typography
            sx={{
              mb: 4,
            }}
          >
            There's no wrong answer. We can help you achieve your goals even if
            you don't have much time.
          </Typography>
          <Step4Items />
        </Stack>
      </Container>
    </>
  );
};
