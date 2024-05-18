import { Box, Button, Paper, Stack } from '@mui/material';
import { broadCoursesSelectionData } from './broadCoursesSelectionData';
import { CourseTopicHeading } from './CourseTopicHeading';
import { CoursesSliderOnly } from './CoursesSliderOnly';
import { useSelectedCourseTopicContext } from '../../hooks/useSelectedCourseTopicContext';

export const CoursesSliderLayout = () => {
  const { topic } = useSelectedCourseTopicContext();

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
        <Stack
          sx={{
            flexDirection: 'row',
          }}
        >
          <CoursesSliderOnly />
          {/* <ScrollToViewList
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
          </ScrollToViewList> */}
        </Stack>
      </Stack>
    </Paper>
  );
};
