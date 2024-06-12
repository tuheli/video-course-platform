import { Typography } from '@mui/material';
import { OpenerProps } from '../../dropdown-openers/MainDropdownOpener';

export const Opener = ({ isDropdownOpen }: OpenerProps) => {
  return (
    <Typography
      variant="body2"
      sx={{
        color: isDropdownOpen ? 'secondary.main' : 'text.primary',
        cursor: 'default',
      }}
    >
      Categories
    </Typography>
  );
};
