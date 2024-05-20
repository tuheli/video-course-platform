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
        color: (theme) => theme.palette.primary.contrastText,
        textDecoration: 'none',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <Box
        sx={{
          py: 0.1,
          width: 180,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 400,
          }}
        >
          {text}
        </Typography>
      </Box>
    </EmptyStyledLink>
  );
};
