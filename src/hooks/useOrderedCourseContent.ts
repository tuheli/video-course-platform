import { useAppSelector } from '../app/hooks';
import { getSortedCopy } from '../components/drag-and-drop/utils';
import { UpdateableCourseContentProperty } from '../features/courseDraftsSlice';
import { useCourseDraft } from './useCourseDraft';

export const useOrderedCourseContent = (
  type: UpdateableCourseContentProperty
) => {
  const courseDraft = useCourseDraft();
  const allCourseDrafts = useAppSelector((state) => state.courseDrafts);

  const matchingCourseDraft = allCourseDrafts.find(
    ({ id }) => id === courseDraft?.id
  );

  if (!matchingCourseDraft) return [];

  const items = matchingCourseDraft.courseContent[type].items;
  return getSortedCopy(items);
};
