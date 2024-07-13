import { Avatar, Box, Paper, Stack, Typography } from '@mui/material';
import { CustomerStory } from '../../../data/customerStoriesData';
import { QuoteImage } from '../learner-positive-reviews/QuoteImage';
import { StyledLink } from '../featured-topics-by-category/StyledLink';

// NOTE: The card min height is for desktop view.
// Smaller screens will have different kind of card.

interface CustomerStoryCardProps {
  customerStory: CustomerStory;
}

const avatarSize = 80;
const minHeight = 270;

export const CustomerStoryCard = ({
  customerStory,
}: CustomerStoryCardProps) => {
  return (
    <Paper
      sx={{
        p: 3,
        minHeight,
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
        }}
      >
        <Stack
          sx={{
            flexDirection: 'column',
            width: '50%',
            gap: 2,
          }}
        >
          <QuoteImage />
          <Typography
            variant="body2"
            sx={{
              minHeight: 145,
            }}
          >
            {customerStory.shortText}
          </Typography>
          <StyledLink>Read full story</StyledLink>
        </Stack>
        <Stack
          sx={{
            flexDirection: 'column',
            width: '50%',
            alignItems: 'center',
            textAlign: 'center',
            gap: 2,
            pt: 2,
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              flexGrow: 1,
            }}
          >
            <Avatar
              sx={{
                width: avatarSize,
                height: avatarSize,
              }}
            />
          </Box>
          <Box
            sx={{
              maxWidth: '60%',
              justifySelf: 'end',
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
              }}
            >
              {customerStory.customer.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
              }}
            >
              {customerStory.customer.jobTitle}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                pt: 2,
              }}
            >
              {customerStory.customer.companyName}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
};
