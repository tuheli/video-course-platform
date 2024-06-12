import { Stack } from '@mui/material';
import { getTopicsWithCourses } from '../../../data/courseData';
import { SelectTopicButton } from './SelectTopicButton';

interface TopicSelectionButtonsProps {
  currentTopic: string;
  maxTopics: number;
  setTopicName: (name: string) => void;
}

export const TopicSelectionButtons = ({
  currentTopic,
  maxTopics,
  setTopicName,
}: TopicSelectionButtonsProps) => {
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
          <SelectTopicButton
            key={index}
            name={name}
            currentTopic={currentTopic}
            setTopicName={setTopicName}
          />
        );
      })}
    </Stack>
  );
};
