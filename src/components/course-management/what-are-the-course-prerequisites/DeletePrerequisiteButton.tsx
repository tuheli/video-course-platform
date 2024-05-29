import { useAppDispatch } from '../../../app/hooks';
import {
  CourseDraft,
  deletedTextItem,
  isAbleToDeletePrerequisite,
} from '../../../features/courseDraftsSlice';
import { DeleteButton } from '../DeleteButton';

interface DeletePrerequisiteButtonProps {
  courseDraft: CourseDraft;
  prerequisiteId: string;
}

export const DeletePrerequisiteButton = ({
  courseDraft,
  prerequisiteId,
}: DeletePrerequisiteButtonProps) => {
  const dispatch = useAppDispatch();

  const isClickingAllowed = isAbleToDeletePrerequisite(courseDraft);

  const onClick = () => {
    if (!isClickingAllowed) return;

    dispatch(
      deletedTextItem({
        courseDraftId: courseDraft.id,
        textItemId: prerequisiteId,
        type: 'prerequisites',
      })
    );
  };

  return (
    <DeleteButton
      onClick={onClick}
      cursor={isClickingAllowed ? 'pointer' : 'not-allowed'}
    />
  );
};
