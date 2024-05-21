import { Container, Stack, Typography } from '@mui/material';
import { ReasonToStart } from './ReasonToStart';

export const ReasonsToStart = () => {
  return (
    <Container>
      <Stack
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            lineHeight: 1.2,
            fontWeight: 600,
          }}
        >
          So many reasons to start
        </Typography>
        <Stack
          sx={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
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
