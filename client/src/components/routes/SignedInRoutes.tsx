import { Route, Routes } from 'react-router-dom';
import LandingPage from '../landing-page/LandingPage';
import { NotFoundPage } from '../not-found-page/NotFoundPage';
import { Redirect } from '../utility/Redirect';
import { InstructorCoursesPage } from '../instructor/InstructorCoursesPage';
import { CourseCreationPage } from '../course-creation/CourseCreationPage';
import { ManageCourseGoalsPage } from '../manage-course-goals-page/ManageCourseGoalsPage';
import { ManageCourseCurriculumPage } from '../manage-course-curriculum-page/ManageCourseCurriculumPage';
import { CourseDraftPreviewPage } from '../course-draft-preview/CourseDraftPreviewPage';
import { Logout } from '../logout/Logout';

// NOTE: I didnt create a different
// front page for logged in users which
// there is in Udemy.

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

      {/** Course management routes */}
      <Route
        path="/instructor/course/:courseId/manage/goals"
        element={<ManageCourseGoalsPage />}
      />
      <Route
        path="/instructor/course/:courseId/manage/curriculum"
        element={<ManageCourseCurriculumPage />}
      />

      {/** Course draft preview route */}
      <Route
        path="/course/draft/:courseId/preview"
        element={<CourseDraftPreviewPage />}
      />

      {/** Logout route - signed out routes handle redirecting to landing page after logout */}
      <Route path="/logout" element={<Logout />} />

      {/** Redirect routes leading to default route */}
      <Route path="/teaching" element={<Redirect to="/instructor" />} />
      <Route path="/signup" element={<Redirect to="/" />} />
      <Route path="/login" element={<Redirect to="/" />} />

      {/** Not found route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
