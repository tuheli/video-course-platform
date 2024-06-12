import { Box, Typography } from '@mui/material';
import { useDropdownContext } from '../../../../../hooks/useDropdownContext';
import { OpenerProps } from '../../../dropdown-openers/MainDropdownOpener';
import { Link } from 'react-router-dom';

interface SubOpenerProps extends OpenerProps {
  text: string;
  linkTo: string;
}

export const Opener = ({ isDropdownOpen, text, linkTo }: SubOpenerProps) => {
  const { closeMainDropdown } = useDropdownContext();

  const onClick = () => {
    closeMainDropdown();
  };

  return (
    <Link
      to={linkTo}
      style={{
        textDecoration: 'none',
      }}
    >
      <Box
        onClick={onClick}
        sx={{
          color: isDropdownOpen ? 'secondary.main' : 'text.primary',
          height: 40,
          display: 'flex',
          alignItems: 'center',
          '&:hover': {
            cursor: 'pointer',
          },
        }}
      >
        <Typography
          sx={{
            width: '100%',
          }}
        >
          {text}
        </Typography>
      </Box>
    </Link>
  );
};
