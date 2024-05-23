import { Box, Paper, Typography } from '@mui/material';

export const Dropdown = () => {
  return (
    <Box
      sx={{
        bgcolor: 'transparent',
      }}
    >
      <Paper
        sx={{
          gap: 2,
          width: 300,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: 'fadeIn 0.2s',
        }}
      >
        <Typography
          sx={{
            color: 'text.primary',
            textAlign: 'center',
          }}
        >
          Switch to the student view here - get back to the courses you're
          taking.
        </Typography>
      </Paper>
    </Box>
  );
};
