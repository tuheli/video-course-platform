import { styled } from '@mui/system';

export const StyledMenuItemLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  '&:hover': {
    color: 'secondary.main',
    cursor: 'pointer',
  },
});
