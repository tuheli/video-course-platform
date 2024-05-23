import { Route, Routes } from 'react-router-dom';
import LandingPage from '../landing-page/LandingPage';
import { NotFoundPage } from '../not-found-page/NotFoundPage';
import { Redirect } from '../redirect/Redirect';

// NOTE: The signed in front page is quite different from landing page so for that it would be good to create a separate page component using some of the same sections as in the landing page.

export const SignedInRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/teaching" element={<Redirect to="/" />} />
      <Route path="/signup" element={<Redirect to="/" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
