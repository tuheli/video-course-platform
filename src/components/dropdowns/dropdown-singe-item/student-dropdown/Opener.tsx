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
        backgroundColor: 'blue',
        // display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: isDropdownOpen ? 'secondary.main' : 'text.primary',
          cursor: 'pointer',
          bgcolor: 'black',
          alignSelf: 'center',
        }}
      >
        Student
      </Typography>
    </Link>
  );
};
