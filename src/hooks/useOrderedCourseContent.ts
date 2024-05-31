import { getSortedCopy } from '../components/drag-and-drop/utils';
import { UpdateableCourseContentProperty } from '../features/courseDraftsSlice';
import { useCourseDraft } from './useCourseDraft';

export const useOrderedCourseContent = (
  type: UpdateableCourseContentProperty
) => {
  const courseDraft = useCourseDraft();
  if (!courseDraft) return [];

  const items = courseDraft.courseContent[type].items;
  return getSortedCopy(items);
};
