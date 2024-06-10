import { ChangeEvent, useState } from 'react';
import {
  CourseDraft,
  TextWithId,
  UpdateableCourseContentProperty,
  deletedTextItem,
  updatedText,
} from '../../features/courseDraftsSlice';
import { useAppDispatch } from '../../app/hooks';
import { Box, Stack } from '@mui/material';
import { InputFieldWithMaxCharacters } from '../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { DeleteButton } from './DeleteButton';
import DraghandleV2 from '../drag-and-drop-v2/DraghandleV2';

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
  const [isMouseOver, setIsMouseOver] = useState(false);

  const dispatch = useAppDispatch();

  const isAbleToDelete = isAbleToDeleteItem(courseDraft);
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
      }}
    >
      <InputFieldWithMaxCharacters
        onChange={onChangeInputField}
        maxInputLength={160}
        placeholder={placeholder}
        value={item.text}
        sx={{
          width: '90%',
          height: 54,
        }}
      />
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
            <DraghandleV2
              style={{
                width: '50%',
              }}
            />
          </>
        )}
      </Box>
    </Stack>
  );
};
