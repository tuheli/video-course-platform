import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { PopularInstructorResource } from '../../../data/popularInstructorResourcesData';

export interface PopularInstructorResourceItemProps {
  resource: PopularInstructorResource;
}

export const PopularInstructorResourceItem = ({
  resource,
}: PopularInstructorResourceItemProps) => {
  return (
    <Link
      to={resource.linkTo}
      style={{
        textDecoration: 'none',
        width: '100%',
      }}
    >
      <Stack
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <resource.Icon
          sx={{
            fontSize: '4rem',
            color: 'text.primary',
          }}
        />
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 600,
            color: 'secondary.light',
            textDecoration: 'underline',
            textDecorationThickness: 2,
            textUnderlineOffset: 4,
          }}
        >
          {resource.linkText}
        </Typography>
        <Typography
          sx={{
            maxWidth: '70%',
            textAlign: 'center',
          }}
        >
          {resource.description}
        </Typography>
      </Stack>
    </Link>
  );
};
