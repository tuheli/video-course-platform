import { Box } from '@mui/material';
import AppAppBar from '../appbar/AppAppBar';
import { HeroBanner } from '../hero-banner/HeroBanner';
import { TrustedByCompaniesLogos } from '../trusted-by-companies-logos/TrustedByCompaniesLogos';
import { LearnerPositiveReviews } from '../learner-positive-reviews/LearnerPositiveReviews';
import { LearnersAreViewingSlider } from '../learners-are-viewing-slider/LearnersAreViewingSlider';
import { TopCategories } from '../top-categories/TopCategories';
import { FeaturedTopicsByCategory } from '../featured-topics-by-category/FeaturedTopicsByCategory';
import { UpskillYourTeam } from '../upskill-your-team/UpskillYourTeam';
import { CustomerStories } from '../customer-stories/CustomerStories';
import { BecomeAnInstructor } from '../become-an-instructor/BecomeAnInstructor';
import { Footer } from '../footer/Footer';
import { BroadSelectionOfCourses } from '../broad-courses-selection/BroadSelectionOfCourses';
import { useScrollToTop } from '../../hooks/useScrollToTop';

const LandingPage = () => {
  useScrollToTop();

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
        <BroadSelectionOfCourses />
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
          py: 4,
        }}
      >
        <UpskillYourTeam />
      </Box>
      <Box
        sx={{
          py: 4,
          bgcolor: 'background.paper',
        }}
      >
        <CustomerStories />
      </Box>
      <Box
        sx={{
          py: 4,
        }}
      >
        <BecomeAnInstructor />
      </Box>
      <Box
        sx={{
          py: 4,
          bgcolor: 'background.dark',
        }}
      >
        <Footer />
      </Box>
    </>
  );
};

export default LandingPage;
