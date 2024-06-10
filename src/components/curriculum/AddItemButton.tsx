import { useCurriculumSectionContext } from '../../hooks/useCurriculumSectionContext';
import { AddMoreButtonDarkVariant } from '../manage-course-goals-page/AddMoreButtonDarkVariant';

interface AddItemButtonProps {
  setOptionsVisibility: (isVisible: boolean) => void;
}

export const AddItemButton = ({ setOptionsVisibility }: AddItemButtonProps) => {
  const { setEditingItemType } = useCurriculumSectionContext();

  const onClick = () => {
    setEditingItemType(undefined);
    setOptionsVisibility(true);
  };

  return <AddMoreButtonDarkVariant text="Curriculum item" onClick={onClick} />;
};
