import { Box } from '@mui/material';
import { broadCoursesSelectionData } from './broadCoursesSelectionData';
import { BroadCoursesSelectionItem } from './BroadCoursesSelectionItem';
import { MainDropdownOpener } from '../dropdowns/dropdown-openers/MainDropdownOpener';
import { CourseCardPopupContent } from './CourseCardPopupContent';
import { ScrollToViewList } from '../scroll-to-view-list/ScrollToViewList';
import { useSelectedCourseTopicContext } from '../../hooks/useSelectedCourseTopicContext';

// NOTE: Note that the current topic is gotten via context

export const CoursesSliderOnly = () => {
  const { topic } = useSelectedCourseTopicContext();

  const topicToShow = broadCoursesSelectionData.find((p) => p.name === topic);

  if (!topicToShow) return null;

  const courseItems = topicToShow.items
    .concat(topicToShow.items)
    .concat(topicToShow.items)
    .concat(topicToShow.items);

  return (
    <ScrollToViewList
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
