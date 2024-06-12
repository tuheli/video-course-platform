import { Stack, Typography } from '@mui/material';
import { LineClampedTypography } from './LineClampedTypography';

interface CourseTopicHeadingProps {
  heading: string;
  description: string;
}

export const CourseTopicHeading = ({
  heading,
  description,
}: CourseTopicHeadingProps) => {
  return (
    <Stack
      sx={{
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          maxWidth: '60%',
        }}
      >
        {heading}
      </Typography>
      <LineClampedTypography
        maxLines={3}
        variant="caption"
        sx={{
          maxWidth: '60%',
        }}
      >
        {description}
      </LineClampedTypography>
    </Stack>
  );
};
