import { Container, Stack, Typography } from '@mui/material';
import { PopularInstructorResourceItem } from './PopularInstructorResourceItem';
import { getPopularInstructorResourcesData } from '../../../data/popularInstructorResourcesData';

export const PopularInstructorResources = () => {
  const popularInstructorResourcesData = getPopularInstructorResourcesData();

  return (
    <Container>
      <Stack
        sx={{
          flexDirection: 'column',
          gap: 8,
          alignItems: 'center',
        }}
      >
        <Typography>
          Have questions? Here are our most popular instructor resources.
        </Typography>
        <Stack
          sx={{
            flexDirection: 'row',
            flex: '1 1 0px',
          }}
        >
          {popularInstructorResourcesData.map((resource, index) => (
            <PopularInstructorResourceItem key={index} resource={resource} />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};
