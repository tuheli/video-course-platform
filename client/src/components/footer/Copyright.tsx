import { Typography } from '@mui/material';

export const Copyright = () => {
  const year = new Date().getFullYear();

  return (
    <Typography
      sx={{
        color: (theme) => theme.palette.primary.contrastText,
      }}
    >
      &copy; {year} Lorem
    </Typography>
  );
};
