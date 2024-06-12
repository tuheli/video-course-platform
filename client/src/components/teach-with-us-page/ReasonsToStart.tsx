import { Box, Container, Stack, Typography } from '@mui/material';
import { ReasonToStart } from './ReasonToStart';

export const ReasonsToStart = () => {
  return (
    <Container>
      <Stack
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          gap: 4,
          minHeight: 300,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              lineHeight: 1.2,
              fontWeight: 600,
            }}
          >
            So many reasons to start
          </Typography>
        </Box>
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <ReasonToStart
            imageUrl="/reason-to-start-images/reason-to-start-image-1.jpg"
            heading="Teach your way"
            description="Publish the course you want, in the way you want, and always have control of your own content."
          />
          <ReasonToStart
            imageUrl="/reason-to-start-images/reason-to-start-image-2.jpg"
            heading="Inspire learners"
            description="Teach what you know and help learners explore their interests, gain new skills, and advance their careers."
          />
          <ReasonToStart
            imageUrl="/reason-to-start-images/reason-to-start-image-3.jpg"
            heading="Get rewarded"
            description="Expand your professional network, build your expertise, and earn money on each paid enrollment."
          />
        </Stack>
      </Stack>
    </Container>
  );
};
