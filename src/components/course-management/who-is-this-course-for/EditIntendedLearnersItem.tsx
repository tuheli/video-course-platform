import { Stack } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import {
  CourseDraft,
  TextWithId,
  updatedText,
} from '../../../features/courseDraftsSlice';
import { InputFieldWithMaxCharacters } from '../../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { ChangeEvent, useState } from 'react';
import { DeleteIntendedLearnersButton } from './DeleteIndendedLearersButton';
import { useDraggableContext } from '../../../hooks/useDraggableContext';
import { BorderAnimationWrapper } from '../../border-animation-wrapper/BorderAnimationWrapper';
import { Draghandle } from '../../drag-and-drop/Draghandle';

interface EditIntendedLearnersItemProps {
  courseDraft: CourseDraft;
  intendedLearner: TextWithId;
}

export const EditIntendedLearnersItem = ({
  courseDraft,
  intendedLearner: intendedLearners,
}: EditIntendedLearnersItemProps) => {
  const [isDeleteIconVisible, setIsDeleteIconVisble] = useState(false);
  const [isDraghandleVisible, setIsDraghandleVisible] = useState(false);
  const { wasDroppedRecently, isBeingDragged } = useDraggableContext();
  const dispatch = useAppDispatch();

  const forceShowExtensions = isBeingDragged;

  const placeholder =
    intendedLearners.text.length > 0
      ? intendedLearners.text
      : 'Example: Beginner Python developers curious about data science';

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updatedText({
        courseDraftId: courseDraft.id,
        itemId: intendedLearners.id,
        newTextValue: event.target.value,
        type: 'intendedLearners',
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
            value={intendedLearners.text}
          />
        </BorderAnimationWrapper>
      )}
      {!wasDroppedRecently && (
        <InputFieldWithMaxCharacters
          onChange={onChange}
          maxInputLength={160}
          placeholder={placeholder}
          value={intendedLearners.text}
        />
      )}
      {(forceShowExtensions || isDeleteIconVisible) && (
        <DeleteIntendedLearnersButton
          courseDraft={courseDraft}
          intendedLearnersId={intendedLearners.id}
        />
      )}
      {(forceShowExtensions || isDraghandleVisible) && <Draghandle />}
    </Stack>
  );
};
