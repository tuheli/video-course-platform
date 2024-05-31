import { useCurriculumSectionContext } from '../../hooks/useCurriculumSectionContext';
import { NewLectureCard } from './NewLectureCard';

export const EditableCurriculumItemSelector = () => {
  const { editingItemType } = useCurriculumSectionContext();

  switch (editingItemType) {
    case 'addLecture':
      return <NewLectureCard />;
    default:
      return <></>;
  }
};
