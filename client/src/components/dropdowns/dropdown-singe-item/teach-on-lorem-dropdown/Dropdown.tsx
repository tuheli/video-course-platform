import { Box, Button, Paper, Typography } from '@mui/material';
import { useDropdownContext } from '../../../../hooks/useDropdownContext';
import { Link } from 'react-router-dom';
import { linkTo } from './TeachDropdown';

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
          Turn what you know into an opportunity and reach millions around the
          world.
        </Typography>
        <Link to={linkTo}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onClick}
          >
            Learn more
          </Button>
        </Link>
      </Paper>
    </Box>
  );
};
