import { useGetCourseDraftsQuery } from '../../features/apiSlice';
import { JumpIntoCourseCreation } from '../course-creation/JumpIntoCourseCreation';
import { MyCourses } from './MyCourses';

export const MyCoursesOrJumpIntoCourseCreation = () => {
  const { data, isLoading } = useGetCourseDraftsQuery();

  const isMyCoursesVisible = !isLoading && data && data.length > 0;

  return (
    <>
      {isMyCoursesVisible ? (
        <MyCourses courseDrafts={data} />
      ) : (
        <JumpIntoCourseCreation />
      )}
    </>
  );
};
