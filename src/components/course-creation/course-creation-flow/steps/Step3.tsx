import { Container, Stack, Typography } from '@mui/material';
import { Step3Item } from './Step3Item';

export const Step3 = () => {
  return (
    <Container>
      <Stack
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Typography variant="h4">
          What category best fits the knowledge you'll share?
        </Typography>
        <Typography
          sx={{
            mb: 4,
          }}
        >
          If you're not sure about the right category, you can change it later.
        </Typography>
        <Step3Item />
      </Stack>
    </Container>
  );
};
