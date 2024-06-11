import { AppBar, Box, Toolbar } from '@mui/material';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { Footer } from '../footer/Footer';
import { Layout } from './Layout';
import { CompanyLogo } from '../appbar/CompanyLogo';

export const CourseDraftPreviewPage = () => {
  useScrollToTop();

  return (
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
        minHeight: '100vh',
      }}
    >
      <AppBar
        sx={{
          position: 'static',
        }}
      >
        <Toolbar
          sx={{
            boxShadow: 'none',
            bgcolor: 'background.dark',
          }}
        >
          <CompanyLogo isWhite={true} />
        </Toolbar>
      </AppBar>
      <Box>
        <Layout />
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
  );
};
