import { Box } from '@mui/material';
import AppAppBar from '../appbar/AppAppBar';
import { HeroBanner } from '../hero-banner/HeroBanner';
import { TrustedByCompaniesLogos } from '../trusted-by-companies-logos/TrustedByCompaniesLogos';
import { BroadCoursesSelection } from '../broad-courses-selection/BroadCoursesSelection';
import { LearnerPositiveReviews } from '../learner-positive-reviews/LearnerPositiveReviews';
import { LearnersAreViewingSlider } from '../learners-are-viewing-slider/LearnersAreViewingSlider';

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
      <Box
        sx={{
          py: 4,
        }}
      >
        <BroadCoursesSelection />
      </Box>
      <Box
        sx={{
          py: 4,
          bgcolor: 'background.paper',
        }}
      >
        <LearnerPositiveReviews />
      </Box>
      <Box
        sx={{
          py: 4,
        }}
      >
        <LearnersAreViewingSlider />
      </Box>
    </>
  );
};

export default LandingPage;
