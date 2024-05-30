import { Typography } from '@mui/material';
import { LightColoredRouterLink } from '../manage-course-goals-page/LightColoredRouterLink';

export const Description = () => {
  return (
    <>
      <Typography>
        Start putting together your course by creating sections, lectures and
        practice activities {'('}
        <LightColoredRouterLink to="">
          quizzes, coding exercises and assignments
        </LightColoredRouterLink>
        {').'} Use your{' '}
        <LightColoredRouterLink to="">course outline</LightColoredRouterLink> to
        structure your content and label your sections and lectures clearly. If
        you’re intending to offer your course for free, the total length of
        video content must be less than 2 hours.
      </Typography>
    </>
  );
};
