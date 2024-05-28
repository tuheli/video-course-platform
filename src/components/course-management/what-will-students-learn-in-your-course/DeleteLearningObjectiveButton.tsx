import { useAppDispatch } from '../../../app/hooks';
import {
  CourseDraft,
  deletedLearningObjective,
  isAbleToDeleteLearningObjective,
} from '../../../features/courseDraftsSlice';
import { DeleteButton } from '../DeleteButton';

interface DeleteLearningObjectiveButtonProps {
  courseDraft: CourseDraft;
  learningObjectiveId: string;
}

export const DeleteLearningObjectiveButton = ({
  courseDraft,
  learningObjectiveId,
}: DeleteLearningObjectiveButtonProps) => {
  const dispatch = useAppDispatch();

  const isClickingAllowed = isAbleToDeleteLearningObjective(courseDraft);

  const onClick = () => {
    if (!isClickingAllowed) return;

    dispatch(
      deletedLearningObjective({
        courseDraftId: courseDraft.id,
        learningObjectiveId,
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
