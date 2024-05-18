import { Box, Stack, Typography } from '@mui/material';
import { CourseCategory } from '../broad-courses-selection/broadCoursesSelectionData';
import { StyledLink } from '../learner-positive-reviews/StyledLink';

interface TopCategoryItemProps {
  category: CourseCategory;
}

export const TopCategoryItem = ({ category }: TopCategoryItemProps) => {
  const onClick = () => {};

  return (
    <StyledLink onClick={onClick}>
      <Stack
        sx={{
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Box
          sx={{
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={category.imageUrl}
            sx={{
              width: '100%',
              height: 'auto',
              display: 'block',
              transform: 'scale(1)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          />
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
          }}
        >
          {category.name}
        </Typography>
      </Stack>
    </StyledLink>
  );
};
