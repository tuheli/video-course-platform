import { Container, Stack, Typography } from '@mui/material';
import { courseCategories } from '../broad-courses-selection/broadCoursesSelectionData';
import { TopCategoryItem } from './TopCategoryItem';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

export const TopCategories = () => {
  const data = courseCategories;
  const categories = data;

  return (
    <Container>
      <Stack
        sx={{
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h5">Top categories</Typography>
        <Grid2 container spacing={2}>
          {categories.map((category, index) => {
            return (
              <Grid2 key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
                <TopCategoryItem category={category} />
              </Grid2>
            );
          })}
        </Grid2>
      </Stack>
    </Container>
  );
};
