import { useAppDispatch } from '../../../app/hooks';
import { useParams } from 'react-router-dom';
import { addedLearningObjective } from '../../../features/courseDraftsSlice';
import { AddMoreButton } from '../AddMoreButton';

export const AddLearningObjectiveButton = () => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();

  const onClick = () => {
    if (!courseId) return;

    dispatch(addedLearningObjective({ courseDraftId: courseId }));
  };

  return <>{courseId && <AddMoreButton onClick={onClick} />}</>;
};
