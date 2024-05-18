import { styled } from '@mui/material';

export const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'text.primary',
  '&:hover': {
    cursor: 'pointer',
  },
});
