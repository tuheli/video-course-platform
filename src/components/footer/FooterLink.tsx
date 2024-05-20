import { Box, Typography } from '@mui/material';
import { EmptyStyledLink } from '../customer-stories/EmptyStyledLink';

interface FooterLinkProps {
  text: string;
}

export const FooterLink = ({ text }: FooterLinkProps) => {
  return (
    <EmptyStyledLink
      href="/"
      sx={{
        color: 'white',
        textDecoration: 'none',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <Box
        sx={{
          py: 0.5,
          width: 200,
        }}
      >
        <Typography variant="body2">{text}</Typography>
      </Box>
    </EmptyStyledLink>
  );
};
