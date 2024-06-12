import { Box, Stack, Typography } from '@mui/material';

interface ReasonToStartProps {
  imageUrl: string;
  heading: string;
  description: string;
}

export const ReasonToStart = ({
  imageUrl,
  heading,
  description,
}: ReasonToStartProps) => {
  return (
    <Stack
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 300,
        gap: 2,
      }}
    >
      <Box
        component="img"
        src={imageUrl}
        sx={{
          maxWidth: 100,
        }}
      />
      <Typography variant="h6">{heading}</Typography>
      <Typography
        variant="body2"
        sx={{
          textAlign: 'center',
        }}
      >
        {description}
      </Typography>
    </Stack>
  );
};
