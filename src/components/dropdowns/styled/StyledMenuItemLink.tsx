import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

export const StyledMenuItemLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  '&:hover': {
    color: 'secondary.main',
    cursor: 'pointer',
  },
});
