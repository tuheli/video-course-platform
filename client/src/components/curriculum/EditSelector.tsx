import { EditableItemType } from '../../contexts/CurriculumSectionContext';
import { NewLectureCard } from './lecture/NewLectureCard';

interface EditSelectorProps {
  activeEditType: EditableItemType | null;
  courseDraftId: number;
  curriculumSectionId: string;
  setEditingItemType: (type: EditableItemType | null) => void;
}

export const EditSelector = ({
  activeEditType,
  courseDraftId,
  curriculumSectionId,
  setEditingItemType,
}: EditSelectorProps) => {
  switch (activeEditType) {
    case 'addLecture':
      return (
        <NewLectureCard
          courseDraftId={courseDraftId}
          curriculumSectionId={curriculumSectionId}
          setEditingItemType={setEditingItemType}
        />
      );
    default:
      return <></>;
  }
};
