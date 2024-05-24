import { Typography } from '@mui/material';
import { useDropdownContext } from '../../../../hooks/useDropdownContext';
import { Link } from 'react-router-dom';

export const Opener = () => {
  const { isDropdownOpen } = useDropdownContext();

  return (
    <Link
      to="/"
      style={{
        textDecoration: 'none',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: isDropdownOpen ? 'secondary.main' : 'text.primary',
          cursor: 'pointer',
          alignSelf: 'center',
        }}
      >
        Student
      </Typography>
    </Link>
  );
};
