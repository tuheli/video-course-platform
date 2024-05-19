import { Box } from '@mui/material';
import { BroadCoursesSelectionItem } from './BroadCoursesSelectionItem';
import { MainDropdownOpener } from '../dropdowns/dropdown-openers/MainDropdownOpener';
import { CourseCardPopupContent } from './CourseCardPopupContent';
import {
  ScrollToViewList,
  SliderForwardedRef,
} from '../scroll-to-view-list/ScrollToViewList';
import { useSelectedCourseTopicContext } from '../../hooks/useSelectedCourseTopicContext';
import { useEffect, useRef } from 'react';
import { getTopic } from '../../../data/courseData';

// NOTE: Note that the current topic is gotten via context

export const CoursesSliderOnly = () => {
  const sliderRef = useRef<SliderForwardedRef>(null);
  const isFirstRender = useRef(true);
  const { topic } = useSelectedCourseTopicContext();

  const topicToShow = getTopic(topic);

  const courseItems = topicToShow?.courses
    .concat(topicToShow.courses)
    .concat(topicToShow.courses)
    .concat(topicToShow.courses);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else if (sliderRef.current) {
      sliderRef.current.resetScroll();
    }
  }, [topicToShow]);

  if (!courseItems) return null;

  return (
    <ScrollToViewList
      ref={sliderRef}
      itemCount={courseItems.length}
      itemQuerySelector="a > div > img"
      showCount={5}
    >
      {courseItems.map((courseItem, index) => {
        return (
          <Box
            key={index}
            sx={{
              scrollSnapAlign: 'start',
            }}
          >
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
            >
              <CourseCardPopupContent courseItem={courseItem} />
            </MainDropdownOpener>
          </Box>
        );
      })}
    </ScrollToViewList>
  );
};
