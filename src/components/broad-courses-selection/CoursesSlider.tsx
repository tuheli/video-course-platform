import { Box, Button, Paper, Stack } from '@mui/material';
import { broadCoursesSelectionData } from './broadCoursesSelectionData';
import { BroadCoursesSelectionItem } from './BroadCoursesSelectionItem';
import { CourseTopicHeading } from './CourseTopicHeading';
import { useContext } from 'react';
import { MainDropdownOpener } from '../dropdowns/dropdown-openers/MainDropdownOpener';
import { CourseCardPopupContent } from './CourseCardPopupContent';
import { SelectedCourseTopicContext } from '../../contexts/SelectedCourseTopicContext';
import { ScrollToViewList } from '../scroll-to-view-list/ScrollToViewList';

export const CoursesSlider = () => {
  const { topic } = useContext(SelectedCourseTopicContext);

  const topicToShow = broadCoursesSelectionData.find((p) => p.name === topic);

  const onClickExplore = () => {};

  if (!topicToShow) return null;

  const courseItems = topicToShow.items
    .concat(topicToShow.items)
    .concat(topicToShow.items)
    .concat(topicToShow.items);

  return (
    <Paper
      sx={{
        padding: 3,
      }}
    >
      {/** Outer stack */}
      <Stack
        sx={{
          flexdirection: 'column',
          gap: 2,
        }}
      >
        <CourseTopicHeading
          heading={topicToShow.heading}
          description={topicToShow.description}
        />
        <Box>
          <Button variant="outlined" onClick={onClickExplore}>
            Explore {topicToShow.name}
          </Button>
        </Box>
        <Stack
          sx={{
            flexDirection: 'row',
          }}
        >
          <ScrollToViewList
            itemCount={courseItems.length}
            itemQuerySelector="a > div > img"
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
        </Stack>
      </Stack>
    </Paper>
  );
};
