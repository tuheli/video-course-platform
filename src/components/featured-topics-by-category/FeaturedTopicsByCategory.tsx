import { Container, Stack, Typography } from '@mui/material';
import {
  CourseCategory,
  getFeaturedCategories,
  getFeaturedTopics,
} from '../../../data/courseData';

export const FeaturedTopicsByCategory = () => {
  const featuredCategories = getFeaturedCategories();

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
  const featuredTopics = getFeaturedTopics(category.name);

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
        {featuredTopics.map(({ name }, index) => {
          return (
            <Stack key={index}>
              <Typography>{name}</Typography>
              <Typography>Learnercount</Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
