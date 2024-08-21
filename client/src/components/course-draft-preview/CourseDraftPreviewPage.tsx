import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { Footer } from '../footer/Footer';
import { Layout } from './Layout';
import { CompanyLogo } from '../appbar/CompanyLogo';
import { useNavigate } from 'react-router-dom';

export const CourseDraftPreviewPage = () => {
  useScrollToTop();
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate(-1);
  };

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
            justifyContent: 'space-between',
          }}
        >
          <CompanyLogo isWhite={true} />
          <Button
            onClick={onClickBack}
            variant="outlined"
            color="primary"
            sx={{
              width: 80,
            }}
          >
            Back
          </Button>
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
