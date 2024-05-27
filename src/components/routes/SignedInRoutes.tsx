import { Route, Routes } from 'react-router-dom';
import LandingPage from '../landing-page/LandingPage';
import { NotFoundPage } from '../not-found-page/NotFoundPage';
import { Redirect } from '../redirect/Redirect';
import { InstructorCoursesPage } from '../instructor/InstructorCoursesPage';
import { CourseCreationPage } from '../course-creation/CourseCreationPage';

// NOTE: I have not yet implemented and probably will not implement a customized landing / homepage for a signed in user to stay within a reasonable scope for this project.

export const SignedInRoutes = () => {
  return (
    <Routes>
      {/** Default to landing page */}
      <Route path="/" element={<LandingPage />} />

      {/** Instructor routes */}
      <Route path="/instructor/courses" element={<InstructorCoursesPage />} />
      <Route
        path="/instructor"
        element={<Redirect to="/instructor/courses" />}
      />

      {/** Course creation routes */}
      <Route path="/course/create/:step" element={<CourseCreationPage />} />
      <Route
        path="/course/create"
        element={<Redirect to="/course/create/1" />}
      />

      {/** Redirect routes leading to default route */}
      <Route path="/teaching" element={<Redirect to="/instructor" />} />
      <Route path="/signup" element={<Redirect to="/" />} />

      {/** Not found route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
