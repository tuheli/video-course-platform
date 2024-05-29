import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { AddMoreButton } from '../AddMoreButton';
import { addedTextItem } from '../../../features/courseDraftsSlice';

export const AddPrerequisiteButton = () => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();

  const onClick = () => {
    if (!courseId) return;

    dispatch(addedTextItem({ courseDraftId: courseId, type: 'prerequisites' }));
  };

  return <>{courseId && <AddMoreButton onClick={onClick} />}</>;
};
