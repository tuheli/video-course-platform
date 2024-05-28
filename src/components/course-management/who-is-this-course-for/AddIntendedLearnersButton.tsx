import { useAppDispatch } from '../../../app/hooks';
import { useParams } from 'react-router-dom';
import { addedIntendedLearners } from '../../../features/courseDraftsSlice';
import { AddMoreButton } from '../AddMoreButton';

export const AddIntendedLearnersButton = () => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();

  const onClick = () => {
    if (!courseId) return;

    dispatch(addedIntendedLearners({ courseDraftId: courseId }));
  };

  return <>{courseId && <AddMoreButton onClick={onClick} />}</>;
};
