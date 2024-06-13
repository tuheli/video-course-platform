import { useAppSelector } from '../../app/hooks';
import { JumpIntoCourseCreation } from '../course-creation/JumpIntoCourseCreation';
import { MyCourses } from './MyCourses';

export const MyCoursesOrJumpIntoCourseCreation = () => {
  const signedInUser = useAppSelector((state) => state.me.user);

  const isMyCoursesVisible =
    useAppSelector((state) => state.courseDrafts).filter(
      ({ creatorEmail }) => signedInUser?.email === creatorEmail
    ).length > 0;

  return (
    <>
      {isMyCoursesVisible && <MyCourses />}
      {!isMyCoursesVisible && <JumpIntoCourseCreation />}
    </>
  );
};
