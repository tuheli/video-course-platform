import { NewLectureCard } from './NewLectureCard';
import { useCurriculumSectionContext } from '../../../hooks/useCurriculumSectionContext';

export const EditableCurriculumItemSelector = () => {
  const { editingItemType } = useCurriculumSectionContext();

  switch (editingItemType) {
    case 'addLecture':
      return <NewLectureCard />;
    default:
      return <></>;
  }
};
