import { Box } from '@mui/material';
import AppAppBar from '../appbar/AppAppBar';
import { HeroBanner } from '../hero-banner/HeroBanner';
import { TrustedByCompaniesLogos } from '../trusted-by-companies-logos/TrustedByCompaniesLogos';
import { BroadCoursesSelection } from '../broad-courses-selection/BroadCoursesSelection';

const LandingPage = () => {
  return <BroadCoursesSelection />;

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
