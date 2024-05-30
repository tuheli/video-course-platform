import { useAppDispatch } from '../../../app/hooks';
import {
  CourseDraft,
  deletedTextItem,
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
      deletedTextItem({
        courseDraftId: courseDraft.id,
        textItemId: intendedLearnersId,
        type: 'intendedLearners',
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
