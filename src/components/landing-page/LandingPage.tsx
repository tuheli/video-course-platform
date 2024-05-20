import { Box } from '@mui/material';
import AppAppBar from '../appbar/AppAppBar';
import { HeroBanner } from '../hero-banner/HeroBanner';
import { TrustedByCompaniesLogos } from '../trusted-by-companies-logos/TrustedByCompaniesLogos';
import { BroadCoursesSelection } from '../broad-courses-selection/BroadCoursesSelection';
import { LearnerPositiveReviews } from '../learner-positive-reviews/LearnerPositiveReviews';
import { LearnersAreViewingSlider } from '../learners-are-viewing-slider/LearnersAreViewingSlider';
import { TopCategories } from '../top-categories/TopCategories';
import { FeaturedTopicsByCategory } from '../featured-topics-by-category/FeaturedTopicsByCategory';
import { UpskillYourTeam } from '../upskill-your-team/UpskillYourTeam';

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
          minHeight: 690,
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
      <Box
        sx={{
          py: 4,
        }}
      >
        <TopCategories />
      </Box>
      <Box
        sx={{
          py: 4,
          bgcolor: 'background.paper',
        }}
      >
        <FeaturedTopicsByCategory />
      </Box>
      <Box
        sx={{
          py: 8,
        }}
      >
        <UpskillYourTeam />
      </Box>
    </>
  );
};

export default LandingPage;
