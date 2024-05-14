import { Box, Container, Stack, Typography } from '@mui/material';

export const HeroBanner = () => {
  return (
    <Container disableGutters>
      <picture
        style={{
          position: 'relative',
          display: 'block',
        }}
      >
        <source srcSet="/hero-banner-wide.jpg" media="(min-width: 1px)" />
        <img
          src=""
          alt="Banner"
          style={{
            objectFit: 'contain',
            width: '100%',
            height: 'auto',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            maxWidth: '38%',
            bgcolor: 'white',
            top: 50,
            left: 50,
            p: 3,
          }}
        >
          <Stack
            sx={{
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="h4" lineHeight="1">
              Lead your best life with new skills
            </Typography>
            <Typography>
              Grow your career and pursue your passions with courses from €9.99
              through May 23.
            </Typography>
          </Stack>
        </Box>
      </picture>
    </Container>
  );
};
