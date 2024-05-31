import { EditableItemType } from '../../../contexts/CurriculumSectionContext';
import { useCurriculumSectionContext } from '../../../hooks/useCurriculumSectionContext';
import { AddMoreButton } from '../../manage-course-goals-page/AddMoreButton';

// NOTE: I added undefined as a type option
// to show a few extra buttons which
// dont do anything. They also will not
// cause a re-render at this point since
// the state doesn't change.

interface AddableItemOptionButtonProps {
  type: EditableItemType | undefined;
  text: string;
}

export const AddableItemOptionButton = ({
  type,
  text,
}: AddableItemOptionButtonProps) => {
  const { setEditingItemType } = useCurriculumSectionContext();

  const onClick = () => {
    setEditingItemType(type);
  };

  return (
    <AddMoreButton
      text={text}
      onClick={onClick}
      sx={{
        pl: 1,
        color: 'secondary.main',
        bgcolor: 'inherit',
        '&:hover': {
          cursor: 'pointer',
          color: 'secondary.dark',
        },
      }}
    />
  );
};
