import { Box, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ArrowProps } from './ArrowLeft';

export const ArrowRight = ({ sx, onClick }: ArrowProps) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 1,
        ...sx,
      }}
    >
      <IconButton color="primary" onClick={onClick}>
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};
