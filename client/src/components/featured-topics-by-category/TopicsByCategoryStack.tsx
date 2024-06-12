import { Stack, Typography } from '@mui/material';
import { CourseCategory, getFeaturedTopics } from '../../../data/courseData';
import { formatValue } from '../../utils/formatters';
import { StyledLink } from './StyledLink';

interface TopicsByCategoryStackProps {
  category: CourseCategory;
}

export const TopicsByCategoryStack = ({
  category,
}: TopicsByCategoryStackProps) => {
  const featuredTopics = getFeaturedTopics(category.name);
  const onClickLink = () => {};

  return (
    <Stack
      sx={{
        flexDirection: 'column',
        gap: 2,
        flex: 1,
      }}
    >
      <Typography variant="h6">{category.name}</Typography>
      <Stack
        sx={{
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {featuredTopics.map((topic, index) => {
          const learnerCount = topic.courses.reduce((acc, course) => {
            return acc + course.learerCount;
          }, 0);

          return (
            <Stack
              key={index}
              sx={{
                gap: 0.5,
              }}
            >
              <StyledLink onClick={onClickLink}>{topic.name}</StyledLink>
              <Typography variant="caption">
                {formatValue(learnerCount)} learners
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
