import { useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { getSortedCopy } from '../components/drag-and-drop/utils';
import { ICurriculumSection } from '../features/courseDraftsSlice';

export const useCurriculumFromParams = (forcedCourseId: string = '') => {
  const myEmail = useAppSelector((state) => state.me.user?.credentials.email);

  const courseId = forcedCourseId || useParams().courseId;

  const courseDraft = useAppSelector((state) => state.courseDrafts).find(
    ({ id, creatorEmail }) => id === courseId && creatorEmail === myEmail
  );

  if (!courseDraft) {
    const curriculum: ICurriculumSection[] = [];

    return {
      courseDraft: null,
      curriculum,
    };
  }

  const sortedCurriculum = getSortedCopy(courseDraft.courseContent.curriculum);

  return {
    courseDraft,
    curriculum: sortedCurriculum,
  };
};
