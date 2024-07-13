import { Container, Stack, Typography } from '@mui/material';
import Slider from 'react-slick';
import { PositiveReviewCard } from './PositiveReviewCard';
import { ArrowRight } from '../slick-arrows/ArrowRight';
import { ArrowLeft } from '../slick-arrows/ArrowLeft';
import { getReviews } from '../../../data/reviewsData';

// NOTE: For some reason padding y in the outer box
// causes a minor visual glitch where the link text
// moves few pixels up when hovered for the first time.
// Fixed it by moving the padding up to the landing page
// and out of this component.

export const LearnerPositiveReviews = () => {
  const reviews = getReviews();

  return (
    <Container>
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
            className: 'slick-slider-padder',
            infinite: false,
            touchMove: false,
            variableWidth: false,
            speed: 500,
            slidesToShow: 3.5,
            slidesToScroll: 1.5,
            nextArrow: <ArrowRight slidesToShow={4} isSliderInfinite={false} />,
            prevArrow: <ArrowLeft isSliderInfinite={false} />,
          }}
        >
          {reviews.map((positiveReview, index) => {
            return (
              <PositiveReviewCard key={index} positiveReview={positiveReview} />
            );
          })}
        </Slider>
      </Stack>
    </Container>
  );
};
