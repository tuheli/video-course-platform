import { styled } from '@mui/system';
import { secondary } from '../../theme';

export const StyledMenuItemLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  textDecoration: 'none',
  color: 'black',
  '&:hover': {
    color: secondary[500],
    cursor: 'pointer',
  },
});
