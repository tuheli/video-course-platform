import { useAppDispatch } from '../../app/hooks';
import { useCreateLearningObjectiveMutation } from '../../features/apiSlice';
import {
  UpdateableCourseContentProperty,
  addedTextItem,
} from '../../features/courseDraftsSlice';
import { AddMoreButton } from './AddMoreButton';

interface AddItemButtonProps {
  courseDraftId: number;
  type: UpdateableCourseContentProperty;
  orderIndex: number;
}

export const AddItemButton = ({
  courseDraftId,
  type,
  orderIndex,
}: AddItemButtonProps) => {
  const [createLearningObjective] = useCreateLearningObjectiveMutation();
  const dispatch = useAppDispatch();

  const onClick = async () => {
    if (type === 'learningObjectives') {
      try {
        await createLearningObjective({
          courseDraftId,
          learningObjective: '',
          orderIndex,
        }).unwrap();
      } catch (error) {}
      return;
    }

    dispatch(addedTextItem({ courseDraftId, type }));
  };

  return <AddMoreButton onClick={onClick} />;
};
