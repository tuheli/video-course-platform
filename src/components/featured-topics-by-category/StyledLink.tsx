import { styled } from '@mui/material';

export const StyledLink = styled('a')(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: 600,
  textDecoration: 'underline',
  textUnderlineOffset: 4,
  '&:hover': {
    cursor: 'pointer',
  },
}));
