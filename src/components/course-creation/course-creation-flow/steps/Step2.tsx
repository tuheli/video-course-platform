import { Container, Stack, Typography } from '@mui/material';
import { Step2Item } from './Step2Item';

export const Step2 = () => {
  return (
    <Container>
      <Stack
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h4">How about a working title?</Typography>
        <Typography>
          It's ok if you can't think of a good title now. You can change it
          later.
        </Typography>
        <Step2Item />
      </Stack>
    </Container>
  );
};
