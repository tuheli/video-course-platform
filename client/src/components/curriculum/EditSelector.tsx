import { NewLectureCard } from './lecture/NewLectureCard';
import { EditableItemType } from './section/Section';

interface EditSelectorProps {
  activeEditType: EditableItemType | null;
  courseDraftId: number;
  curriculumSectionId: number;
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
