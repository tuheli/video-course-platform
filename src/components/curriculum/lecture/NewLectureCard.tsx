import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { addedLecture } from '../../../features/courseDraftsSlice';
import { EditableItemType } from '../../../contexts/CurriculumSectionContext';
import { Stack, Typography } from '@mui/material';
import { InputFieldWithMaxCharacters } from '../../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { SaveAndCancelButton } from '../SaveAndCancelButton';

interface NewLectureCardProps {
  courseDraftId: string;
  curriculumSectionId: string;
  setEditingItemType: (type: EditableItemType | null) => void;
}

export const NewLectureCard = ({
  courseDraftId,
  curriculumSectionId,
  setEditingItemType,
}: NewLectureCardProps) => {
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onClickAddLecture = () => {
    dispatch(
      addedLecture({
        courseDraftId,
        curriculumSectionId,
        lectureTitle: title,
      })
    );

    setEditingItemType(null);
  };

  const onClickCancel = () => {
    setEditingItemType(null);
  };

  return (
    <Stack
      onMouseDown={(event) => event.stopPropagation()}
      sx={{
        flexDirection: 'row',
        gap: 1,
        p: 1,
        border: '1px solid',
        borderColor: 'text.primary',
        bgcolor: 'background.default',
      }}
    >
      <Stack
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
          gap: 1,
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography>New Lecture:</Typography>
          <InputFieldWithMaxCharacters
            onChange={onChangeTitle}
            maxInputLength={80}
            value={title}
            placeholder="Enter a title"
            autofocus={true}
            sx={{
              width: '80%',
            }}
          />
        </Stack>
        <SaveAndCancelButton
          saveButtonText="Add New Lecture"
          onClickCancel={onClickCancel}
          onClickSave={onClickAddLecture}
        />
      </Stack>
    </Stack>
  );
};
