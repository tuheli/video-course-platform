import { Box, Stack, Typography } from '@mui/material';
import { CustomerStory } from '../../../data/customerStoriesData';

interface CustomerStoryBigImageVersionProps {
  customerStory: CustomerStory;
}

export const CustomerStoryCardBigImageVersion = ({
  customerStory,
}: CustomerStoryBigImageVersionProps) => {
  return (
    <Box>
      <Stack
        sx={{
          flexDirection: 'row',
          maxHeight: 400,
          gap: 4,
        }}
      >
        <Box
          sx={{
            width: '50%',
            alignItems: 'center',
          }}
        >
          <img
            src={customerStory.customer.imageUrl}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            width: '50%',
          }}
        >
          <Stack
            sx={{
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography sx={{}}>{customerStory.shortText}</Typography>
            <Box>
              <Typography
                sx={{
                  mt: 1,
                  fontWeight: 600,
                }}
              >
                {customerStory.customer.name}
              </Typography>
              <Typography sx={{}}>{customerStory.customer.jobTitle}</Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
