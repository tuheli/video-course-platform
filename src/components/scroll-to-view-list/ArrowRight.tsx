import { Box, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ArrowProps } from './ArrowLeft';

interface RightArrowProps extends ArrowProps {
  slidesToShow: number;
  slideCount?: number;
}

export const ArrowRight = ({
  sx,
  currentSlide,
  slideCount,
  slidesToShow,
  isSliderInfinite,
  onClick,
}: RightArrowProps) => {
  console.log(
    'ArrowRight rendered, currentslide',
    currentSlide,
    'slidecount',
    slideCount
  );

  const isVisible =
    !isSliderInfinite &&
    currentSlide !== undefined &&
    slideCount !== undefined &&
    currentSlide + slidesToShow < slideCount;

  return (
    <>
      {isVisible && (
        <Box
          sx={{
            position: 'absolute',
            zIndex: 1,
            right: 0,
            top: '50%',
            transform: 'translateY(-50%) translateX(50%)',
            ...sx,
          }}
        >
          <IconButton color="primary" onClick={onClick}>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </>
  );
};
