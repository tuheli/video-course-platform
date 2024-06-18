import { useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { getSortedByOrderIndexCopy } from '../components/drag-and-drop-v2/utils';
import { ICurriculumSection } from '../features/courseDraftsSlice';

export const useCurriculumFromParams = (forcedCourseId: string = '') => {
  const signedInUser = useAppSelector((state) => state.me.user);

  const courseIdFromParams = useParams().courseId;
  const courseId = forcedCourseId || courseIdFromParams;

  const courseDraft = useAppSelector((state) => state.courseDrafts).find(
    ({ id, creatorEmail }) =>
      id === courseId && creatorEmail === signedInUser?.email
  );

  if (!courseDraft) {
    const curriculum: ICurriculumSection[] = [];

    return {
      courseDraft: null,
      curriculum,
    };
  }

  const sortedCurriculum = getSortedByOrderIndexCopy(
    courseDraft.courseContent.curriculum
  );

  return {
    courseDraft,
    curriculum: sortedCurriculum,
    courseDraftId: courseDraft.id,
  };
};
