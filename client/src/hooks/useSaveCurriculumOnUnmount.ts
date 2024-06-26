import { useParams } from 'react-router-dom';
import { useSaveCurriculum } from './useSaveCurriculum';
import { useEffect } from 'react';
import { store } from '../app/store';

// NOTE: If strict mode is on (dev mode) and user navigates
// quicky away from and back to the page this hook
// is on, it seems that the second call will
// "override" the first one and the initial
// curriculum state is saved.

export const useSaveCurriculumOnUnmount = () => {
  const { saveCurriculum } = useSaveCurriculum();
  const { courseId } = useParams();

  useEffect(() => {
    return () => {
      const courseDraftId = Number(courseId);
      const courseDraft = store
        .getState()
        .courseDrafts.find(({ id }) => id === courseDraftId);

      if (!courseDraft) return;
      saveCurriculum(courseDraft);
    };
  }, []);
};
