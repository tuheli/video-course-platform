import { useAppDispatch } from '../../../app/hooks';
import {
  CourseDraft,
  deletedTextItem,
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
      deletedTextItem({
        courseDraftId: courseDraft.id,
        textItemId: learningObjectiveId,
        type: 'learningObjectives',
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
