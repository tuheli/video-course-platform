import { useAppDispatch } from '../../app/hooks';
import {
  UpdateableCourseContentProperty,
  addedTextItem,
} from '../../features/courseDraftsSlice';
import { AddMoreButton } from './AddMoreButton';

interface AddItemButtonProps {
  courseDraftId: string;
  type: UpdateableCourseContentProperty;
}

export const AddItemButton = ({ courseDraftId, type }: AddItemButtonProps) => {
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(addedTextItem({ courseDraftId, type }));
  };

  return <AddMoreButton onClick={onClick} />;
};
