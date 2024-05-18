import { Box, IconButton, SxProps } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export interface ArrowProps {
  onClick?: () => void;
  sx?: SxProps;
}

export const ArrowLeft = ({ sx, onClick }: ArrowProps) => {
  return (
    <Box
      sx={{
        ...sx,
        position: 'absolute',
        zIndex: 1,
      }}
    >
      <IconButton color="primary" onClick={onClick}>
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};
