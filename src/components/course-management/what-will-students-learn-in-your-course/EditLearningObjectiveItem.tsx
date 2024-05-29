import { Stack } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import {
  CourseDraft,
  TextWithId,
  updatedLearningObjective,
} from '../../../features/courseDraftsSlice';
import { InputFieldWithMaxCharacters } from '../../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { ChangeEvent, useState } from 'react';
import { DeleteLearningObjectiveButton } from './DeleteLearningObjectiveButton';
import { Draghandle } from '../../drag-and-drop/Draghandle';
import { useDraggableContext } from '../../../hooks/useDraggableContext';

interface EditLearningObjectiveItemProps {
  courseDraft: CourseDraft;
  learningObjective: TextWithId;
}

export const EditLearningObjectiveItem = ({
  courseDraft,
  learningObjective,
}: EditLearningObjectiveItemProps) => {
  const [isDeleteIconVisible, setIsDeleteIconVisble] = useState(false);
  const [isDraghandleVisible, setIsDraghandleVisible] = useState(false);
  const { isBeingDragged } = useDraggableContext();

  const forceShowExtensions = isBeingDragged;

  const dispatch = useAppDispatch();

  const placeholder =
    learningObjective.text.length > 0
      ? learningObjective.text
      : 'Example: Define the roles and responsibilities of a project manager';

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updatedLearningObjective({
        courseDraftId: courseDraft.id,
        learningObjectiveId: learningObjective.id,
        text: event.target.value,
      })
    );
  };

  const onMouseEnter = () => {
    setIsDeleteIconVisble(true);
    setIsDraghandleVisible(true);
  };

  const onMouseLeave = () => {
    setIsDeleteIconVisble(false);
    setIsDraghandleVisible(false);
  };

  return (
    <Stack
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        flexDirection: 'row',
        width: 'fit-content',
      }}
    >
      <InputFieldWithMaxCharacters
        onChange={onChange}
        maxInputLength={160}
        placeholder={placeholder}
        value={learningObjective.text}
      />
      {(forceShowExtensions || isDeleteIconVisible) && (
        <DeleteLearningObjectiveButton
          courseDraft={courseDraft}
          learningObjectiveId={learningObjective.id}
        />
      )}
      {(forceShowExtensions || isDraghandleVisible) && <Draghandle />}
    </Stack>
  );
};
