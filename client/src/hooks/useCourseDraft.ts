import { useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

export const useCourseDraft = () => {
  const signedInUser = useAppSelector((state) => state.me.user);

  const { courseId } = useParams();

  const courseDraft = useAppSelector((state) => state.courseDrafts).find(
    ({ id, creatorEmail }) =>
      id === courseId && creatorEmail === signedInUser?.email
  );

  return courseDraft;
};
