import { Container, Stack, Typography } from '@mui/material';

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
        <Typography variant="h4">Step 3</Typography>
      </Stack>
    </Container>
  );
};
