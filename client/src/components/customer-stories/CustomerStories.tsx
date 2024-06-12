import { Box, Container, Stack } from '@mui/material';
import { getCustomerStoriesAvatarVersion } from '../../../data/customerStoriesData';
import { CustomerStoryCard } from './CustomerStoryCard';
import Slider from 'react-slick';
import { ArrowRight } from '../slick-arrows/ArrowRight';
import { ArrowLeft } from '../slick-arrows/ArrowLeft';
import { ViewMoreCustomerStoriesLink } from './ViewMoreCustomerStoriesLink';

export const CustomerStories = () => {
  const customerStories = getCustomerStoriesAvatarVersion();
  const slidesToShowCount = 1;

  return (
    <Container>
      <Stack
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            maxWidth: 740,
            position: 'relative',
            margin: 'auto',
          }}
        >
          <Slider
            {...{
              infinite: false,
              touchMove: false,
              speed: 500,
              slidesToShow: slidesToShowCount,
              slidesToScroll: 1,
              nextArrow: (
                <ArrowRight
                  isSliderInfinite={false}
                  slidesToShow={slidesToShowCount}
                  sx={{
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%) translateX(50%)',
                  }}
                />
              ),
              prevArrow: (
                <ArrowLeft
                  isSliderInfinite={false}
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
        <Box>
          <ViewMoreCustomerStoriesLink />
        </Box>
      </Stack>
    </Container>
  );
};
