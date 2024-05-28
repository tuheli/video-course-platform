import { useAppDispatch } from '../../../app/hooks';
import {
  CourseDraft,
  deletedIntendedLearners,
  isAbleToDeleteIntendedLearners,
} from '../../../features/courseDraftsSlice';
import { DeleteButton } from '../DeleteButton';

interface DeleteIntendedLearnersButtonProps {
  courseDraft: CourseDraft;
  intendedLearnersId: string;
}

export const DeleteIntendedLearnersButton = ({
  courseDraft,
  intendedLearnersId,
}: DeleteIntendedLearnersButtonProps) => {
  const dispatch = useAppDispatch();

  const isClickingAllowed = isAbleToDeleteIntendedLearners(courseDraft);

  const onClick = () => {
    if (!isClickingAllowed) return;

    dispatch(
      deletedIntendedLearners({
        courseDraftId: courseDraft.id,
        intendedLearnersId,
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
