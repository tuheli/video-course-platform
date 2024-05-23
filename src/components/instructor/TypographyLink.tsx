import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface TypographyLinkProps {
  to: string;
  text: string;
}

export const TypographyLink = ({ to, text }: TypographyLinkProps) => {
  return (
    <Link
      to={to}
      style={{
        textDecoration: 'none',
      }}
    >
      <Typography
        sx={{
          color: 'text.primary',
          '&:hover': {
            color: 'secondary.main',
          },
        }}
      >
        {text}
      </Typography>
    </Link>
  );
};
