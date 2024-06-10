import { ChangeEvent, useState } from 'react';
import {
  CourseDraft,
  TextWithId,
  UpdateableCourseContentProperty,
  deletedTextItem,
  updatedText,
} from '../../features/courseDraftsSlice';
import { useDraggableContext } from '../../hooks/useDraggableContext';
import { useAppDispatch } from '../../app/hooks';
import { Stack } from '@mui/material';
import { InputFieldWithMaxCharacters } from '../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { Draghandle } from '../drag-and-drop/Draghandle';
import { DeleteButton } from './DeleteButton';

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
  const [isDeleteIconVisible, setIsDeleteIconVisble] = useState(false);
  const [isDraghandleVisible, setIsDraghandleVisible] = useState(false);
  const { isBeingDragged } = useDraggableContext();
  const dispatch = useAppDispatch();

  const forceShowExtensions = isBeingDragged;

  const isAbleToDelete = isAbleToDeleteItem(courseDraft);
  const deleteIconCursor = isAbleToDelete ? 'pointer' : 'not-allowed';

  const placeholder = item.text.length > 0 ? item.text : examplePlaceholderText;

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

  const onClickDeleteIcon = () => {
    if (!isAbleToDelete) return;
    dispatch(
      deletedTextItem({
        courseDraftId: courseDraft.id,
        textItemId: item.id,
        type,
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
        outline: isBeingDragged ? '2px solid' : 'none',
        outlineColor: isBeingDragged ? 'secondary.light' : 'none',
      }}
    >
      <InputFieldWithMaxCharacters
        onChange={onChangeInputField}
        maxInputLength={160}
        placeholder={placeholder}
        value={item.text}
      />
      {(forceShowExtensions || isDeleteIconVisible) && (
        <DeleteButton
          fontSize={16}
          onClick={onClickDeleteIcon}
          cursor={deleteIconCursor}
        />
      )}
      {(forceShowExtensions || isDraghandleVisible) && <Draghandle />}
    </Stack>
  );
};
