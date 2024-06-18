import { CircularProgress, Stack } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import {
  useCreateIntendedLearnerMutation,
  useCreateLearningObjectiveMutation,
  useCreatePrerequisiteMutation,
} from '../../features/apiSlice';
import {
  CourseDraft,
  UpdateableCourseContentProperty,
  addedTextItem,
} from '../../features/courseDraftsSlice';
import { useSaveCourseDraftGoals } from '../../hooks/useSaveCourseDraftGoals';
import { AddMoreButton } from './AddMoreButton';
import { useState } from 'react';

interface AddItemButtonProps {
  courseDraft: CourseDraft;
  type: UpdateableCourseContentProperty;
  orderIndex: number;
}

export const AddItemButton = ({
  courseDraft,
  type,
  orderIndex,
}: AddItemButtonProps) => {
  const [isProcessingRequest, setIsProcessingRequest] = useState(false);
  const [createLearningObjective] = useCreateLearningObjectiveMutation();
  const [createPrerequisite] = useCreatePrerequisiteMutation();
  const [createIntendedLearner] = useCreateIntendedLearnerMutation();
  const { saveCourseDraftGoals } = useSaveCourseDraftGoals();
  const dispatch = useAppDispatch();

  const onClick = async () => {
    try {
      setIsProcessingRequest(true);
      switch (type) {
        case 'learningObjectives':
          await saveCourseDraftGoals(courseDraft);
          await createLearningObjective({
            courseDraftId: courseDraft.id,
            learningObjective: '',
            orderIndex,
          }).unwrap();
          break;
        case 'prerequisites':
          await saveCourseDraftGoals(courseDraft);
          await createPrerequisite({
            courseDraftId: courseDraft.id,
            prerequisite: '',
            orderIndex,
          }).unwrap();
          break;
        case 'intendedLearners':
          await saveCourseDraftGoals(courseDraft);
          await createIntendedLearner({
            courseDraftId: courseDraft.id,
            intendedLearner: '',
            orderIndex,
          }).unwrap();
          break;
        default:
          throw new Error('Unknown type of item to add.');
      }

      dispatch(addedTextItem({ courseDraftId: courseDraft.id, type }));
      setIsProcessingRequest(false);
    } catch (error) {
      console.log('Error adding item:', error);
      setIsProcessingRequest(false);
    }
  };

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <AddMoreButton onClick={onClick} />
      {isProcessingRequest && <CircularProgress size={18} />}
    </Stack>
  );
};
