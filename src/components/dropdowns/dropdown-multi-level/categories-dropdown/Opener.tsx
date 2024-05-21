import { useDropdownContext } from '../../../../hooks/useDropdownContext';
import { Typography } from '@mui/material';

export const Opener = () => {
  const { isDropdownOpen } = useDropdownContext();

  return (
    <Typography
      variant="body2"
      sx={{
        color: isDropdownOpen ? 'secondary.main' : 'text.primary',
        cursor: 'pointer',
      }}
    >
      Categories
    </Typography>
  );
};
