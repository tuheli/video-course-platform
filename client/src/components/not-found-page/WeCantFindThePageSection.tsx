import { Box, Container, Stack, Typography } from '@mui/material';
import { EmptyStyledLink } from '../customer-stories/EmptyStyledLink';

export const WeCantFindThePageSection = () => {
  return (
    <Container>
      <Stack
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box>
          <Box
            component="img"
            src="/not-found-page-images/not-found-page-image.jpg"
            alt="404"
          />
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontSize: '2rem',
          }}
        >
          We can't find the page you're looking for
        </Typography>
        <Typography>
          Visit our{' '}
          <EmptyStyledLink
            sx={{
              color: 'secondary.main',
            }}
            href="/"
          >
            support page
          </EmptyStyledLink>{' '}
          for further assistance
        </Typography>
      </Stack>
    </Container>
  );
};
