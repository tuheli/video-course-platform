import { useAppDispatch } from '../../../app/hooks';
import { useParams } from 'react-router-dom';
import { AddMoreButton } from '../AddMoreButton';
import { addedTextItem } from '../../../features/courseDraftsSlice';

export const AddLearningObjectiveButton = () => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();

  const onClick = () => {
    if (!courseId) return;

    dispatch(
      addedTextItem({ courseDraftId: courseId, type: 'learningObjectives' })
    );
  };

  return <>{courseId && <AddMoreButton onClick={onClick} />}</>;
};
