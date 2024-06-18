import { getSortedByOrderIndexCopy } from '../components/drag-and-drop-v2/utils';
import { UpdateableCourseContentProperty } from '../features/courseDraftsSlice';
import { useCourseDraft } from './useCourseDraft';

export const useOrderedCourseContent = (
  type: UpdateableCourseContentProperty
) => {
  const courseDraft = useCourseDraft();
  if (!courseDraft) return [];

  const items = courseDraft.courseContent[type].items;
  return getSortedByOrderIndexCopy(items);
};
