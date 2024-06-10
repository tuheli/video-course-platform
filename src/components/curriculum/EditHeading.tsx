import { Box, Stack, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import { InputFieldWithMaxCharacters } from '../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { SaveAndCancelButton } from './SaveAndCancelButton';

interface EditHeading {
  title: string;
  titleValue: string;
  saveButtonText: string;
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickCancel: () => void;
  onClickSave: () => void;
}

export const EditHeading = ({
  title,
  titleValue,
  saveButtonText,
  onChangeTitle,
  onClickCancel,
  onClickSave,
}: EditHeading) => {
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        gap: 1,
        bgcolor: 'red',
      }}
    >
      <Stack
        onMouseDown={(event) => event.stopPropagation()}
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
          <Typography>{title}</Typography>
          <InputFieldWithMaxCharacters
            onChange={onChangeTitle}
            maxInputLength={80}
            value={titleValue}
            placeholder="Enter a title"
            autofocus={true}
          />
        </Stack>
        <SaveAndCancelButton
          saveButtonText={saveButtonText}
          onClickCancel={onClickCancel}
          onClickSave={onClickSave}
        />
      </Stack>
    </Stack>
  );
};
