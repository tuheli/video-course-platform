import { Box, Stack } from '@mui/material';
import AppAppBar from '../appbar/AppAppBar';
import { Footer } from '../footer/Footer';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { SignInSection } from './SignInSection';

export const SignInPage = () => {
  useScrollToTop();

  return (
    <>
      <AppAppBar />
      <Stack
        sx={{
          height: '100vh',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            py: 4,
          }}
        >
          <SignInSection />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
          }}
        />
        <Box
          sx={{
            bgcolor: 'background.dark',
            py: 4,
          }}
        >
          <Footer />
        </Box>
      </Stack>
    </>
  );
};
