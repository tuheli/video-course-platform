import { Typography } from '@mui/material';
import { useDropdownContext } from '../../../../hooks/useDropdownContext';
import { Link } from 'react-router-dom';
import { linkTo } from './TeachDropdown';

export const Opener = () => {
  const { isDropdownOpen } = useDropdownContext();

  return (
    <Link
      to={linkTo}
      style={{
        textDecoration: 'none',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: isDropdownOpen ? 'secondary.main' : 'text.primary',
          cursor: 'pointer',
        }}
      >
        Teach on Lorem
      </Typography>
    </Link>
  );
};
