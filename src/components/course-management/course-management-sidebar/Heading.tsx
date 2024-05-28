import { Typography } from '@mui/material';

interface HeadingProps {
  text: string;
}
export const Heading = ({ text }: HeadingProps) => {
  return (
    <Typography
      variant="body2"
      sx={{
        fontWeight: 600,
        pl: 3,
      }}
    >
      {text}
    </Typography>
  );
};
