import { Stack } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import {
  CourseDraft,
  TextWithId,
  updatedText,
} from '../../../features/courseDraftsSlice';
import { InputFieldWithMaxCharacters } from '../../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { ChangeEvent, useState } from 'react';
import { DeletePrerequisiteButton } from './DeletePrerequisiteButton';
import { Draghandle } from '../../drag-and-drop/Draghandle';
import { BorderAnimationWrapper } from '../../border-animation-wrapper/BorderAnimationWrapper';
import { useDraggableContext } from '../../../hooks/useDraggableContext';
import { inputFieldWidth } from '../common';

interface EditPrerequisitesItemProps {
  courseDraft: CourseDraft;
  prerequisite: TextWithId;
}

export const EditPrerequisitesItem = ({
  courseDraft,
  prerequisite,
}: EditPrerequisitesItemProps) => {
  const [isDeleteIconVisible, setIsDeleteIconVisble] = useState(false);
  const [isDraghandleVisible, setIsDraghandleVisible] = useState(false);
  const { wasDroppedRecently, isBeingDragged } = useDraggableContext();
  const dispatch = useAppDispatch();

  const forceShowExtensions = isBeingDragged;

  const placeholder =
    prerequisite.text.length > 0
      ? prerequisite.text
      : 'Example: No programming experience needed. You will learn everything you need to know';

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updatedText({
        courseDraftId: courseDraft.id,
        itemId: prerequisite.id,
        newTextValue: event.target.value,
        type: 'prerequisites',
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
      {wasDroppedRecently && (
        <BorderAnimationWrapper>
          <InputFieldWithMaxCharacters
            onChange={onChange}
            maxInputLength={160}
            placeholder={placeholder}
            value={prerequisite.text}
            outerDivSx={{ width: inputFieldWidth }}
          />
        </BorderAnimationWrapper>
      )}
      {!wasDroppedRecently && (
        <InputFieldWithMaxCharacters
          onChange={onChange}
          maxInputLength={160}
          placeholder={placeholder}
          value={prerequisite.text}
          outerDivSx={{ width: inputFieldWidth }}
        />
      )}
      {(forceShowExtensions || isDeleteIconVisible) && (
        <DeletePrerequisiteButton
          courseDraft={courseDraft}
          prerequisiteId={prerequisite.id}
        />
      )}
      {(forceShowExtensions || isDraghandleVisible) && <Draghandle />}
    </Stack>
  );
};
