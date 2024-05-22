import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const BecomeAnInstructorVariant = () => {
  return (
    <Container>
      <Stack
        sx={{
          flexDirection: 'row',
          gap: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack
          sx={{
            flexDirection: 'column',
            gap: 2,
            alignItems: 'center',
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
            Become an instructor today
          </Typography>
          <Typography
            sx={{
              color: 'text.primary',
            }}
          >
            Join one of the world’s largest online learning marketplaces.
          </Typography>
          <Box>
            <Link to="/">
              <Button variant="contained" color="primary">
                Get started
              </Button>
            </Link>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};
