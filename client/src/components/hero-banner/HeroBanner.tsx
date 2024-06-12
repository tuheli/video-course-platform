import { Box, Container, Stack, Typography } from '@mui/material';
import { useState } from 'react';

export const HeroBanner = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const onImageLoaded = () => {
    setIsLoaded(true);
  };

  return (
    <Container disableGutters>
      <picture
        style={{
          position: 'relative',
          display: 'block',
          minHeight: 370,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
          zIndex: -1,
        }}
      >
        <source
          srcSet="/hero-banners/hero-banner-wide.jpg"
          media="(min-width: 1px)"
        />
        <img
          src=""
          alt="Banner"
          style={{
            objectFit: 'contain',
            width: '100%',
            height: 'auto',
          }}
          onLoad={onImageLoaded}
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
