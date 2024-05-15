import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { broadCoursesSelectionData } from './broadCoursesSelectionData';
import { BroadCoursesSelectionItem } from './BroadCoursesSelectionItem';
import { CourseTopicHeading } from './CourseTopicHeading';
import { useState } from 'react';
import { MainDropdownOpener } from '../dropdowns/dropdown-openers/MainDropdownOpener';
import '../dropdowns/animations/fadeAnimation.css';

// NOTE: Margin top is for developing. Remove it later.

export const BroadCoursesSelection = () => {
  const [selectedTopicName, setSelectedTopicName] = useState('Python');

  const topicToShow = broadCoursesSelectionData.find(
    (p) => p.name === selectedTopicName
  );

  const onClickTopic = (topic: string) => {
    setSelectedTopicName(topic);
  };

  const onClickExplore = () => {};

  if (!topicToShow) return null;

  return (
    <Container
      sx={{
        mt: 16,
      }}
    >
      <Stack
        sx={{
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4">A broad selection of courses</Typography>
        <Typography
          variant="body1"
          sx={{
            py: 1,
          }}
        >
          Choose from over 210,000 online video courses with new additions
          published every month
        </Typography>
        <Stack
          sx={{
            flexDirection: 'row',
            gap: 2,
          }}
        >
          {broadCoursesSelectionData.map(({ name }, index) => {
            return (
              <Button
                key={index}
                variant="text"
                onClick={() => onClickTopic(name)}
                sx={{
                  color:
                    name === selectedTopicName
                      ? 'text.primary'
                      : 'text.secondary',
                  fontSize: 15,
                  fontWeight: 600,
                  '&:hover': {
                    color: 'text.primary',
                  },
                }}
              >
                {name}
              </Button>
            );
          })}
        </Stack>
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
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1,
                        backgroundColor: 'rgba(0,0,0)',
                        color: 'white',
                        animation: 'fadeIn 0.2s',
                      }}
                    >
                      HELLO WORLD HELLO WORLDHELLO WORLDHELLO WORLDHELLO
                      WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO
                      WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO
                      WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO
                      WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO
                      WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLD
                    </Box>
                  </MainDropdownOpener>
                );
              })}
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};
