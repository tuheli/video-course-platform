import { useCurriculumSectionContext } from '../../hooks/useCurriculumSectionContext';
import { AddLectureCard } from './lecture/AddLectureCard';

export const EditSelector = () => {
  const { editingItemType } = useCurriculumSectionContext();

  switch (editingItemType) {
    case 'addLecture':
      return <AddLectureCard />;
    default:
      return <></>;
  }
};
