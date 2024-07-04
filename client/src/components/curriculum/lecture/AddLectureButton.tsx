import { AddMoreButton } from '../../manage-course-goals-page/AddMoreButton';
import { EditableItemType } from '../section/Section';

// NOTE: I added undefined as a type option
// to show a few extra buttons which
// dont do anything. They also will not
// cause a re-render at this point since
// the state doesn't change.

// FIX: On specific conditions, when these buttons
// are visible and a lecture is being edited above,
// hovering this button causes text in the
// add more button to move a few pixels upwards.

interface AddableItemOptionButtonProps {
  type: EditableItemType | null;
  text: string;
  setEditingItemType: (type: EditableItemType | null) => void;
  closeEditOptions: () => void;
}

export const AddableItemOptionButton = ({
  type,
  text,
  setEditingItemType,
  closeEditOptions,
}: AddableItemOptionButtonProps) => {
  const onClick = () => {
    closeEditOptions();
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
