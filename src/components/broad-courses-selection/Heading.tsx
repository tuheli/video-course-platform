import { Stack, Typography } from '@mui/material';

export const Heading = () => {
  return (
    <Stack
      sx={{
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4">A broad selection of courses</Typography>
      <Typography
        variant="body1"
        sx={{
          py: 1,
        }}
      >
        Choose from over 210,000 online video courses with new additions
        published every month
      </Typography>
    </Stack>
  );
};
