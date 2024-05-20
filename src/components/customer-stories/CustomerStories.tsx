import { Box, Container } from '@mui/material';
import { getCustomerStories } from '../../../data/customerStoriesData';
import { CustomerStoryCard } from './CustomerStoryCard';
import Slider from 'react-slick';
import { ArrowRight } from '../scroll-to-view-list/ArrowRight';
import { ArrowLeft } from '../scroll-to-view-list/ArrowLeft';

export const CustomerStories = () => {
  const customerStories = getCustomerStories();

  return (
    <Container>
      <Box
        sx={{
          maxWidth: 700,
          position: 'relative',
          margin: 'auto',
        }}
      >
        <Slider
          {...{
            infinite: true,
            touchMove: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: (
              <ArrowRight
                sx={{
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%) translateX(50%)',
                }}
              />
            ),
            prevArrow: (
              <ArrowLeft
                sx={{
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%) translateX(-50%)',
                }}
              />
            ),
          }}
        >
          {customerStories.map((customerStory, index) => {
            return (
              <CustomerStoryCard key={index} customerStory={customerStory} />
            );
          })}
        </Slider>
      </Box>
    </Container>
  );
};
