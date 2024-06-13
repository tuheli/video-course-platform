import { Route, Routes } from 'react-router-dom';
import LandingPage from '../landing-page/LandingPage';
import { TeachWithUsPage } from '../teach-with-us-page/TeachWithUsPage';
import { NotFoundPage } from '../not-found-page/NotFoundPage';
import { SignUpPage } from '../sign-up/SignUpPage';
import { Redirect } from '../redirect/Redirect';
import { SignInPage } from '../sign-in/SignInPage';

export const SignedOutRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/teaching" element={<TeachWithUsPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/logout" element={<Redirect to="/" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
