import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useState } from 'react';

// NOTE: Animation is not in parent box on purpose. Otherwise can cause rendering on top of app bars box shadow druing animation.

export const TeachWithUsBanner = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const onImageLoaded = () => {
    setIsLoaded(true);
  };

  // NOTE: Open sign up modal
  const onClickGetStarted = () => {};

  return (
    <Container disableGutters maxWidth={'xl'}>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <picture
          style={{
            position: 'relative',
            display: 'block',
            minHeight: 370,
            zIndex: -1,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        >
          <source
            srcSet="/promo-images/come-teach-with-us-banner-image-desktop-wide.jpg"
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
        </picture>
        <Box
          sx={{
            position: 'absolute',
            maxWidth: '25%',
            bgcolor: 'transparent',
            top: 100,
            left: 150,
            p: 2,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        >
          <Stack
            sx={{
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                lineHeight: 1.2,
                fontWeight: 600,
              }}
            >
              Come teach with us
            </Typography>
            <Typography>
              Become an instructor and change lives — including your own
            </Typography>
            <Button
              color="primary"
              variant="contained"
              onClick={onClickGetStarted}
            >
              Get started
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};
