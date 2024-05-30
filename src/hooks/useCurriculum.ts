import { getSortedCopy } from '../components/drag-and-drop/utils';
import { useCourseDraft } from './useCourseDraft';

export const useCurriculum = () => {
  const courseDraft = useCourseDraft();

  if (!courseDraft) return { courseDraft: null, curriculum: [] };

  const sortedCurriculum = getSortedCopy(courseDraft.courseContent.curriculum);

  return {
    courseDraft,
    curriculum: sortedCurriculum,
  };
};
