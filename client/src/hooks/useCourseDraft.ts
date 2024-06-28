import { useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

export const useCourseDraft = () => {
  const { courseId } = useParams();
  const courseDrafts = useAppSelector((state) => state.courseDrafts);
  const courseDraftId = Number(courseId);
  const courseDraft = courseDrafts.find(({ id }) => id === courseDraftId);
  return courseDraft;
};
