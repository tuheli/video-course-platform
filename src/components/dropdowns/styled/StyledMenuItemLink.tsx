import { styled } from '@mui/system';

export const StyledMenuItemLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  textDecoration: 'none',
  '&:hover': {
    color: 'secondary.main',
    cursor: 'pointer',
  },
});
