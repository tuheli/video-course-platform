import { Button, Stack } from '@mui/material';
import { useSelectedCourseTopicContext } from '../../hooks/useSelectedCourseTopicContext';
import { getTopicsWithCourses } from '../../../data/courseData';

export const TopicSelectionButtons = () => {
  const { topic, changeTopic } = useSelectedCourseTopicContext();

  const onClickTopic = (topic: string) => {
    changeTopic(topic);
  };

  const maxTopics = 5;
  const topicsData = getTopicsWithCourses(maxTopics);

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        gap: 2,
      }}
    >
      {topicsData.map(({ name }, index) => {
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
