import { Box, Typography } from '@mui/material';

export const Opener = ({ text }: { text: string }) => {
  return (
    <Box
      sx={{
        height: 40,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          width: '100%',
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};
