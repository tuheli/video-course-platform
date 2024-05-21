import { Box, Button, Paper, Typography } from '@mui/material';
import { useDropdownContext } from '../../../../hooks/useDropdownContext';
import { Link } from 'react-router-dom';
import { linkTo } from './BusinessDropdown';

export const Dropdown = () => {
  const { closeMainDropdown } = useDropdownContext();

  const onClick = () => {
    closeMainDropdown();
  };

  return (
    <Box
      sx={{
        bgcolor: 'transparent',
      }}
    >
      <Paper
        sx={{
          gap: 2,
          width: 260,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: 'fadeIn 0.2s',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: 'text.primary',
            textAlign: 'center',
          }}
        >
          Get your team access to over 25,000 top Lorem courses, anytime,
          anywhere.
        </Typography>
        <Link to={linkTo}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onClick}
          >
            Try Lorem Business
          </Button>
        </Link>
      </Paper>
    </Box>
  );
};
