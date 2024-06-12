import { Box, Container } from '@mui/material';
import { ArrowRight } from '../slick-arrows/ArrowRight';
import { ArrowLeft } from '../slick-arrows/ArrowLeft';
import { getCustomerStoriesBigImageVersion } from '../../../data/customerStoriesData';
import { CustomerStoryCardBigImageVersion } from './CustomerStoryCardBigImageVersion';
import Slider from 'react-slick';

const slidesToShowCount = 1;

export const CustomerStoriesBigImageVersion = () => {
  const customerStories = getCustomerStoriesBigImageVersion();

  return (
    <Container>
      <Box
        sx={{
          maxWidth: 740,
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
                  right: -30,
                  top: '50%',
                  transform: 'translateY(-50%) translateX(50%)',
                }}
              />
            ),
            prevArrow: (
              <ArrowLeft
                isSliderInfinite={false}
                sx={{
                  left: -30,
                  top: '50%',
                  transform: 'translateY(-50%) translateX(-50%)',
                }}
              />
            ),
          }}
        >
          {customerStories.map((customerStory, index) => {
            return (
              <CustomerStoryCardBigImageVersion
                key={index}
                customerStory={customerStory}
              />
            );
          })}
        </Slider>
      </Box>
    </Container>
  );
};
