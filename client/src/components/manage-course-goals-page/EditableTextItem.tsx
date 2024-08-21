import { ChangeEvent, useState } from 'react';
import {
  CourseDraft,
  TextWithId,
  UpdateableCourseContentProperty,
  deletedTextItem,
  minTextItemTextLength,
  updatedText,
} from '../../features/courseDraftsSlice';
import { useAppDispatch } from '../../app/hooks';
import { Box, Stack } from '@mui/material';
import { InputFieldWithMaxCharacters } from '../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { DeleteButton } from './DeleteButton';
import { MemoDraghandle } from '../drag-and-drop-v2/Draghandle';
import {
  useDeleteIntendedLearnerMutation,
  useDeleteLearningObjectiveMutation,
  useDeletePrerequisiteMutation,
} from '../../features/apiSlice';
import { useSaveCourseDraftGoals } from '../../hooks/useSaveCourseDraftGoals';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

interface EditableTextItemProps {
  examplePlaceholderText: string;
  type: UpdateableCourseContentProperty;
  item: TextWithId;
  courseDraft: CourseDraft;
  isAbleToDeleteItem: (courseDraft: CourseDraft) => boolean;
}

export const EditableTextItem = ({
  item,
  examplePlaceholderText,
  courseDraft,
  type,
  isAbleToDeleteItem,
}: EditableTextItemProps) => {
  const [isProcessingRequest, setIsProcessingRequest] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [deleteLearningObjective] = useDeleteLearningObjectiveMutation();
  const [deletePrerequisite] = useDeletePrerequisiteMutation();
  const [deleteIntendedLearner] = useDeleteIntendedLearnerMutation();
  const { saveCourseDraftGoals } = useSaveCourseDraftGoals();
  const dispatch = useAppDispatch();

  const isAbleToDelete =
    isAbleToDeleteItem(courseDraft) && !isProcessingRequest;

  const textLength = item.text.length;
  const placeholder = textLength > 0 ? item.text : examplePlaceholderText;
  const isAttentionMarksVisible = textLength < minTextItemTextLength;

  const onChangeInputField = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updatedText({
        courseDraftId: courseDraft.id,
        itemId: item.id,
        newTextValue: event.target.value,
        type,
      })
    );
  };

  const onClickDeleteIcon = async () => {
    if (!isAbleToDelete) return;

    try {
      setIsProcessingRequest(true);
      await saveCourseDraftGoals(courseDraft);
      switch (type) {
        case 'learningObjectives':
          await deleteLearningObjective({
            courseDraftId: courseDraft.id,
            learningObjectiveId: item.id,
          }).unwrap();
          break;
        case 'prerequisites':
          await deletePrerequisite({
            courseDraftId: courseDraft.id,
            prerequisiteId: item.id,
          }).unwrap();
          break;
        case 'intendedLearners':
          await deleteIntendedLearner({
            courseDraftId: courseDraft.id,
            intendedLearnerId: item.id,
          }).unwrap();
          break;
        default:
          throw new Error('Unknown type of item to delete');
      }

      dispatch(
        deletedTextItem({
          courseDraftId: courseDraft.id,
          textItemId: item.id,
          type,
        })
      );
      setIsProcessingRequest(false);
    } catch (error) {
      console.log('Error deleting item', error);
      setIsProcessingRequest(false);
    }
  };

  const onMouseEnter = () => {
    setIsMouseOver(true);
  };

  const onMouseLeave = () => {
    setIsMouseOver(false);
  };

  return (
    <Stack
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        flexDirection: 'row',
        bgcolor: 'background.default',
        position: 'relative',
      }}
    >
      {isAttentionMarksVisible && (
        <PriorityHighIcon
          sx={{
            alignSelf: 'center',
            color: 'secondary.light',
            display: 'block',
            position: 'absolute',
            top: 16,
            left: -28,
            zIndex: 1,
            borderRadius: '10%',
          }}
        />
      )}
      <Box
        sx={{
          flex: 1,
          outlineWidth: isAttentionMarksVisible ? 1 : 0,
          outlineOffset: 1,
          outlineColor: 'secondary.light',
          outlineStyle: 'solid',
        }}
      >
        <InputFieldWithMaxCharacters
          onChange={onChangeInputField}
          maxInputLength={160}
          placeholder={placeholder}
          value={item.text}
          sx={{
            height: 54,
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '16%',
        }}
      >
        {isMouseOver && (
          <>
            <DeleteButton
              onClick={onClickDeleteIcon}
              cursor={isAbleToDelete ? 'pointer' : 'not-allowed'}
              sx={{
                width: '50%',
              }}
            />
            <MemoDraghandle
              sx={{
                width: '50%',
                border: '1px solid',
                borderLeft: 'none',
                borderColor: 'text.primary',
              }}
            />
          </>
        )}
      </Box>
    </Stack>
  );
};
