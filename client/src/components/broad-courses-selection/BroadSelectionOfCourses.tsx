import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { getTopic } from '../../../data/courseData';
import { CourseTopicHeading } from './CourseTopicHeading';
import { CoursesSlider, CoursesSliderForwardRef } from './CoursesSlider';
import { TopicSelectionButtons } from './TopicSelectionButtons';
import { useRef, useState } from 'react';

const minHeight = 600;

export const BroadSelectionOfCourses = () => {
  const [currentTopicName, setCurrentTopicName] = useState('Adobe Illustrator');
  const sliderRef = useRef<CoursesSliderForwardRef>(null);

  const onClickExplore = () => {};

  const onClickTopic = (topicName: string) => {
    setCurrentTopicName(topicName);
    sliderRef.current?.resetSlider();
  };

  const topic = getTopic(currentTopicName);

  if (!topic) return null;

  return (
    <Container>
      <Stack
        sx={{
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h4">Broad Selection of Courses</Typography>
        <Paper
          sx={{
            padding: 3,
            minHeight,
          }}
        >
          <Stack
            sx={{
              flexdirection: 'column',
              gap: 2,
            }}
          >
            <Box
              sx={{
                padding: 1,
              }}
            >
              <CourseTopicHeading
                heading={topic.heading}
                description={topic.description}
              />
            </Box>
            <Box
              sx={{
                padding: 1,
              }}
            >
              <Button variant="outlined" onClick={onClickExplore}>
                Explore {topic.name}
              </Button>
            </Box>
            <Box
              sx={{
                padding: 1,
              }}
            >
              <TopicSelectionButtons
                currentTopic={currentTopicName}
                maxTopics={5}
                setTopicName={onClickTopic}
              />
            </Box>
            <CoursesSlider
              ref={sliderRef}
              topic={topic}
              isSliderInfinite={false}
            />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};
