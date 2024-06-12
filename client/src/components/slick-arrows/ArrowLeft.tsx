import { Box, IconButton, SxProps } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export interface ArrowProps {
  isSliderInfinite: boolean;
  sx?: SxProps;
  currentSlide?: number;
  onClick?: () => void;
}

export const ArrowLeft = ({
  sx,
  currentSlide,
  isSliderInfinite,
  onClick,
}: ArrowProps) => {
  const isVisible =
    !isSliderInfinite && currentSlide !== undefined && currentSlide !== 0;

  return (
    <>
      {isVisible && (
        <Box
          sx={{
            position: 'absolute',
            zIndex: 1,
            left: 0,
            top: '50%',
            transform: 'translateY(-50%) translateX(-50%)',
            ...sx,
          }}
        >
          <IconButton color="primary" onClick={onClick}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </>
  );
};
