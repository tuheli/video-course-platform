import { Button, Stack } from '@mui/material';
import { broadCoursesSelectionData } from './broadCoursesSelectionData';
import { useSelectedCourseTopicContext } from '../../hooks/useSelectedCourseTopicContext';

export const TopicSelectionButtons = () => {
  const { topic, changeTopic } = useSelectedCourseTopicContext();

  const onClickTopic = (topic: string) => {
    changeTopic(topic);
  };

  return (
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
              color: name === topic ? 'text.primary' : 'text.secondary',
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
  );
};
