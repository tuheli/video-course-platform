import { styled } from '@mui/material';

export const StyledLink = styled('a')(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: 600,
  textDecoration: 'underline',
  '&:hover': {
    cursor: 'pointer',
  },
}));
