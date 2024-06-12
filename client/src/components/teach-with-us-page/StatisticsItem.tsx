import { Stack, Typography } from '@mui/material';

interface StatisticsItemProps {
  count: string;
  text: string;
}

export const StatisticsItem = ({ count, text }: StatisticsItemProps) => {
  return (
    <Stack
      sx={{
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 600,
          color: 'text.contrast',
        }}
      >
        {count}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          color: 'text.contrast',
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
};
