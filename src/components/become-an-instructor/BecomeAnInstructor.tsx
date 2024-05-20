import { Box, Button, Container, Stack, Typography } from '@mui/material';

const itemWidth = 360;

export const BecomeAnInstructor = () => {
  const onClickStartTeachingToday = () => {};

  return (
    <Container>
      <Stack
        sx={{
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/promo-images/become-an-instructor-promo-image.jpg"
          width={itemWidth}
        />
        <Stack
          sx={{
            flexDirection: 'column',
            gap: 2,
            width: itemWidth,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: 'text.primary',
              fontWeight: 500,
              lineHeight: 1,
            }}
          >
            Become an instructor
          </Typography>
          <Typography
            sx={{
              color: 'text.primary',
            }}
          >
            Instructors from around the world teach millions of learners on
            Udemy. We provide the tools and skills to teach what you love.
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={onClickStartTeachingToday}
            >
              Start teaching today
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};
