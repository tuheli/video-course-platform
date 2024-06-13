import { useAppSelector } from '../../app/hooks';
import { JumpIntoCourseCreation } from '../course-creation/JumpIntoCourseCreation';
import { MyCourses } from './MyCourses';

export const MyCoursesOrJumpIntoCourseCreation = () => {
  const myEmail = useAppSelector((state) => state.me.user?.email);

  const isMyCoursesVisible =
    useAppSelector((state) => state.courseDrafts).filter(
      ({ creatorEmail }) => myEmail === creatorEmail
    ).length > 0;

  return (
    <>
      {isMyCoursesVisible && <MyCourses />}
      {!isMyCoursesVisible && <JumpIntoCourseCreation />}
    </>
  );
};
