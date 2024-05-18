import { Box, Stack, Typography } from '@mui/material';
import { CourseCategory } from '../broad-courses-selection/broadCoursesSelectionData';

interface TopCategoryItemProps {
  category: CourseCategory;
}

export const TopCategoryItem = ({ category }: TopCategoryItemProps) => {
  return (
    <Stack
      sx={{
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Box component="img" src={category.imageUrl} />
      <Typography variant="h6">{category.name}</Typography>
    </Stack>
  );
};
