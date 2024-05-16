import { Box } from '@mui/material';
import { useState } from 'react';
import { SelectedCourseTopicContext } from '../../contexts/SelectedCourseTopicContext';
import { TopicSelectionButtons } from './TopicSelectionButtons';
import { CoursesCarousel } from './CoursesCarousel';

// NOTE: Courses carousel needs to be wrapped in a box with min height to prevent visual bug when changing topics. Without min height atleast the carousel height the screen height adjusts quickly top and back down and whole screen is repainted. This happened when scrollbar existed and current scroll position was low enough.

export const RenderingCourseTopicContextProvider = () => {
  const [topic, setTopic] = useState('Python');
  const minCoursesCarouselHeight = 600;

  const changeTopic = (topic: string) => {
    setTopic(topic);
  };

  return (
    <SelectedCourseTopicContext.Provider value={{ topic, changeTopic }}>
      <TopicSelectionButtons />
      <Box
        sx={{
          minHeight: minCoursesCarouselHeight,
        }}
      >
        <CoursesCarousel />
      </Box>
    </SelectedCourseTopicContext.Provider>
  );
};
