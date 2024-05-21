import { Box } from '@mui/material';
import AppAppBar from '../appbar/AppAppBar';
import { WeCantFindThePageSection } from './WeCantFindThePageSection';
import { Footer } from '../footer/Footer';

export const NotFoundPage = () => {
  return (
    <>
      <AppAppBar />
      <Box
        sx={{
          flexDirection: 'column',
          display: 'flex',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            py: 4,
          }}
        >
          <WeCantFindThePageSection />
        </Box>
        <Box
          sx={{
            py: 4,
            bgcolor: 'background.dark',
            marginTop: 'auto',
          }}
        >
          <Footer />
        </Box>
      </Box>
    </>
  );
};