import { useAppSelector } from '../app/hooks';
import { UpdateableCourseContentProperty } from '../features/courseDraftsSlice';
import { useCourseDraft } from './useCourseDraft';

export const useOrderedItems = (type: UpdateableCourseContentProperty) => {
  const courseDraft = useCourseDraft();
  const allCourseDrafts = useAppSelector((state) => state.courseDrafts);

  const matchingCourseDraft = allCourseDrafts.find(
    ({ id }) => id === courseDraft?.id
  );

  if (!matchingCourseDraft) return [];

  const itemsCopy = [...matchingCourseDraft.courseContent[type].items];

  return itemsCopy.sort((a, b) => a.orderIndex - b.orderIndex);
};
