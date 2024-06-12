import { useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

export const useCourseDraft = () => {
  const myEmail = useAppSelector((state) => state.me.user?.credentials.email);

  const { courseId } = useParams();

  const courseDraft = useAppSelector((state) => state.courseDrafts).find(
    ({ id, creatorEmail }) => id === courseId && creatorEmail === myEmail
  );

  return courseDraft;
};
