import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { getFeaturedCategories } from '../../../data/courseData';
import { TopicsByCategoryStack } from './TopicsByCategoryStack';

export const FeaturedTopicsByCategory = () => {
  const featuredCategories = getFeaturedCategories();

  const onClickExploreMore = () => {};

  return (
    <Container>
      <Stack
        sx={{
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Typography variant="h5">Featured topics by category</Typography>
        <Stack
          sx={{
            flexDirection: 'row',
            gap: 4,
          }}
        >
          {featuredCategories.map((category, index) => {
            return <TopicsByCategoryStack key={index} category={category} />;
          })}
        </Stack>
        <Box>
          <Button
            variant="outlined"
            color="primary"
            onClick={onClickExploreMore}
          >
            Explore more topics
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};
