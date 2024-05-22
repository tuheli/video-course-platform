import { Box } from '@mui/material';
import { BroadCoursesSelectionItem } from './BroadCoursesSelectionItem';
import { MainDropdownOpener } from '../dropdowns/dropdown-openers/MainDropdownOpener';
import { CourseCardPopupContent } from './CourseCardPopupContent';
import Slider from 'react-slick';
import { ArrowRight } from '../scroll-to-view-list/ArrowRight';
import { ArrowLeft } from '../scroll-to-view-list/ArrowLeft';
import { CourseTopic } from '../../../data/courseData';
import { forwardRef, useImperativeHandle, useRef } from 'react';

interface CoursesSliderProps {
  topic: CourseTopic;
  isSliderInfinite: boolean;
}

export interface CoursesSliderForwardRef {
  resetSlider: () => void;
}

export const CoursesSlider = forwardRef<
  CoursesSliderForwardRef,
  CoursesSliderProps
>(({ topic, isSliderInfinite }, ref) => {
  const slickRef = useRef<Slider>(null);

  const courseItems = topic?.courses
    .concat(topic.courses)
    .concat(topic.courses)
    .concat(topic.courses);

  useImperativeHandle(ref, () => {
    return {
      resetSlider: () => {
        slickRef.current?.slickGoTo(0, true);
      },
    };
  });

  if (!courseItems) return null;

  return (
    <Slider
      ref={slickRef}
      {...{
        infinite: false,
        touchMove: false,
        variableWidth: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        nextArrow: (
          <ArrowRight
            slidesToShow={5}
            isSliderInfinite={isSliderInfinite}
            sx={{
              top: '25%',
              right: 8,
            }}
          />
        ),
        prevArrow: (
          <ArrowLeft
            isSliderInfinite={isSliderInfinite}
            sx={{
              top: '25%',
              left: 8,
            }}
          />
        ),
      }}
    >
      {courseItems.map((courseItem, index) => {
        return (
          <Box key={index}>
            <MainDropdownOpener
              height="content"
              RenderComponent={({ isDropdownOpen }) =>
                BroadCoursesSelectionItem({
                  courseItem,
                  isHovered: isDropdownOpen,
                })
              }
              forceOpen={false}
              usePortal={true}
              isMainDropdown={true}
            >
              <CourseCardPopupContent courseItem={courseItem} />
            </MainDropdownOpener>
          </Box>
        );
      })}
    </Slider>
  );
});
