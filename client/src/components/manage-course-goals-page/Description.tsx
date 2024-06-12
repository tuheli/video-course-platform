import { Typography } from '@mui/material';
import { LightColoredRouterLink } from './LightColoredRouterLink';

export const Description = () => {
  return (
    <>
      <Typography>
        The following descriptions will be publicly visible on your{' '}
        <LightColoredRouterLink to="">
          Course Landing Page
        </LightColoredRouterLink>{' '}
        and will have a direct impact on your course performance. These
        descriptions will help learners decide if your course is right for them.
      </Typography>
    </>
  );
};
