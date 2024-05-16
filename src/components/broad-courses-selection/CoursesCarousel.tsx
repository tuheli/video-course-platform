import { Box, Button, Paper, Stack } from '@mui/material';
import { broadCoursesSelectionData } from './broadCoursesSelectionData';
import { BroadCoursesSelectionItem } from './BroadCoursesSelectionItem';
import { CourseTopicHeading } from './CourseTopicHeading';
import { useContext } from 'react';
import { MainDropdownOpener } from '../dropdowns/dropdown-openers/MainDropdownOpener';
import { CourseCardPopupContent } from './CourseCardPopupContent';
import { SelectedCourseTopicContext } from '../../contexts/SelectedCourseTopicContext';

export const CoursesCarousel = () => {
  const { topic } = useContext(SelectedCourseTopicContext);

  const topicToShow = broadCoursesSelectionData.find((p) => p.name === topic);

  const onClickExplore = () => {};

  if (!topicToShow) return null;

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
        {/** Carousel of course cards (currently a stack) */}
        <Stack
          sx={{
            flexDirection: 'row',
            gap: 2,
          }}
        >
          {topicToShow.items.map((courseItem, index) => {
            return (
              <MainDropdownOpener
                key={index}
                height="content"
                RenderComponent={({ isDropdownOpen }) =>
                  BroadCoursesSelectionItem({
                    courseItem,
                    isHovered: isDropdownOpen,
                  })
                }
              >
                <CourseCardPopupContent courseItem={courseItem} />
              </MainDropdownOpener>
            );
          })}
        </Stack>
      </Stack>
    </Paper>
  );
};
