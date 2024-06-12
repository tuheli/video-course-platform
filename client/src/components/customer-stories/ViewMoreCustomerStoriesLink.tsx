import { Typography } from '@mui/material';
import { EmptyStyledLink } from './EmptyStyledLink';
import { ArrowForwardIosSharp } from '@mui/icons-material';

export const ViewMoreCustomerStoriesLink = () => {
  const onClickLink = () => {};

  return (
    <EmptyStyledLink
      onClick={onClickLink}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        py: 2,
        gap: 0.5,
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <Typography
        sx={{
          color: 'secondary.main',
          fontWeight: 600,
          textDecoration: 'underline',
          textUnderlineOffset: 4,
          lineHeight: 1,
        }}
      >
        View more customer stories
      </Typography>
      <ArrowForwardIosSharp
        sx={{
          color: 'secondary.main',
          fontSize: 12,
        }}
      />
    </EmptyStyledLink>
  );
};
