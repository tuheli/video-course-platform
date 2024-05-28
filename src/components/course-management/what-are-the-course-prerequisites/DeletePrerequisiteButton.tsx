import { useAppDispatch } from '../../../app/hooks';
import {
  CourseDraft,
  deletedPrerequisite,
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
      deletedPrerequisite({
        courseDraftId: courseDraft.id,
        prerequisiteId,
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
