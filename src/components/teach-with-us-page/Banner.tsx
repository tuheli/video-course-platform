import { Box, Button, Container, Typography } from '@mui/material';
import { useState } from 'react';

export const Banner = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const onImageLoaded = () => {
    setIsLoaded(true);
  };

  // NOTE: Open sign up modal
  const onClickGetStarted = () => {};

  return (
    <Container disableGutters maxWidth={'xl'}>
      <div
        style={{
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '80%',
            top: '50%',
            transform: 'translateY(-50%)',
            left: '10%',
            paddingLeft: 100,
          }}
        >
          <div
            style={{
              maxWidth: 260,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h2">Come teach with us</Typography>
            <Typography
              sx={{
                mt: 1,
              }}
            >
              Become an instructor and change lives — including your own
            </Typography>
            <Box
              sx={{
                mt: 2,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={onClickGetStarted}
              >
                Get started
              </Button>
            </Box>
          </div>
        </div>
        <div
          style={{
            height: 600,
          }}
        >
          <img
            src="\promo-images\come-teach-with-us-banner-image-desktop-wide.jpg"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'none',
            }}
            onLoad={onImageLoaded}
          />
        </div>
      </div>
    </Container>
  );
};
