import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { addedPrerequisite } from '../../../features/courseDraftsSlice';
import { AddMoreButton } from '../AddMoreButton';

export const AddPrerequisiteButton = () => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();

  const onClick = () => {
    if (!courseId) return;

    dispatch(addedPrerequisite({ courseDraftId: courseId }));
  };

  return <>{courseId && <AddMoreButton onClick={onClick} />}</>;
};
