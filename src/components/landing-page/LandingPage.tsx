import { Box } from '@mui/material';
import AppAppBar from '../appbar/AppAppBar';
import { HeroBanner } from '../hero-banner/HeroBanner';
import { TrustedByCompaniesLogos } from '../trusted-by-companies-logos/TrustedByCompaniesLogos';

const LandingPage = () => {
  return (
    <>
      <AppAppBar />
      <HeroBanner />
      <Box
        sx={{
          pt: 4,
        }}
      >
        <TrustedByCompaniesLogos />
      </Box>
    </>
  );
};

export default LandingPage;
