import { Container, Stack, Typography } from '@mui/material';
import {
  CourseCategory,
  courseCategories,
} from '../broad-courses-selection/broadCoursesSelectionData';

export const FeaturedTopicsByCategory = () => {
  const data = courseCategories;
  const featuredCategories = data.filter(
    ({ name }) =>
      name === 'Development' ||
      name === 'Business' ||
      name === 'IT and Software' ||
      name === 'Design'
  );

  return (
    <Container>
      <Stack
        sx={{
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h5">Featured Topics By Category</Typography>
        <Stack
          sx={{
            flexDirection: 'row',
            gap: 2,
          }}
        >
          {featuredCategories.map((category, index) => {
            return <TopicsByCategoryStack key={index} category={category} />;
          })}
        </Stack>
      </Stack>
    </Container>
  );
};

interface TopicsByCategoryStackProps {
  category: CourseCategory;
}

const TopicsByCategoryStack = ({ category }: TopicsByCategoryStackProps) => {
  const featuredTopics = category.topicNames.slice(0, 3);

  return (
    <Stack
      sx={{
        flexDirection: 'column',
        gap: 2,
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
          return (
            <Stack key={index}>
              <Typography>{topic}</Typography>
              <Typography>Learnercount</Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
