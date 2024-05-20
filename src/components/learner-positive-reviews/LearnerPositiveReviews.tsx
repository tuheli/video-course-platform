import { Box, Container, Stack, Typography } from '@mui/material';
import Slider from 'react-slick';
import { PositiveReviewCard } from './PositiveReviewCard';
import { ArrowRight } from '../scroll-to-view-list/ArrowRight';
import { ArrowLeft } from '../scroll-to-view-list/ArrowLeft';
import { getReviews } from '../../../data/reviewsData';

// NOTE: For some reason padding y in the outer box causes a minor visual glitch where the link text moves few pixels up when hovered for the first time. Fixed it by moving the padding up to the landing page and out of this component.

export const LearnerPositiveReviews = () => {
  const reviews = getReviews();

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
      }}
    >
      <Container sx={{}}>
        <Stack
          sx={{
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h5">
            How learners like you are achieving their goals
          </Typography>
          <Slider
            {...{
              dots: false,
              infinite: true,
              variableWidth: true,
              touchMove: false,
              slidesToShow: 3,
              slidesToScroll: 1,
              nextArrow: <ArrowRight sx={{ right: -18, top: '40%' }} />,
              prevArrow: <ArrowLeft sx={{ left: -18, top: '40%' }} />,
            }}
          >
            {reviews.map((positiveReview, index) => {
              return (
                <PositiveReviewCard
                  key={index}
                  positiveReview={positiveReview}
                />
              );
            })}
          </Slider>
        </Stack>
      </Container>
    </Box>
  );
};
