import { Box, Paper, Stack, SxProps, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import { inputSx, inputOuterDivSx } from './common';
import { InputFieldWithMaxCharacters } from '../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { SaveAndCancelButton } from './SaveAndCancelButton';

interface EditHeading {
  title: string;
  titleValue: string;
  saveButtonText: string;
  children?: React.ReactNode;
  titleSx?: SxProps;
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickCancel: () => void;
  onClickSave: () => void;
}

export const EditHeading = ({
  title,
  titleValue,
  saveButtonText,
  children,
  titleSx,
  onChangeTitle,
  onClickCancel,
  onClickSave,
}: EditHeading) => {
  return (
    <Paper
      sx={{
        p: 1,
        py: 1.5,
        border: '1px solid',
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          gap: 1,
        }}
      >
        <Box
          sx={{
            minWidth: '13%',
          }}
        >
          <Typography
            sx={{
              fontWeight: 400,
              ...titleSx,
            }}
          >
            {title}
          </Typography>
        </Box>
        <Stack
          sx={{
            flexDirection: 'column',
            flex: 1,
            gap: 1,
          }}
        >
          <InputFieldWithMaxCharacters
            onChange={onChangeTitle}
            maxInputLength={80}
            value={titleValue}
            placeholder="Enter a title"
            autofocus={true}
            outerDivSx={{
              ...inputOuterDivSx,
            }}
            inputSx={{
              ...inputSx,
            }}
          />
          {children}
          <SaveAndCancelButton
            saveButtonText={saveButtonText}
            onClickCancel={onClickCancel}
            onClickSave={onClickSave}
          />
        </Stack>
      </Stack>
    </Paper>
  );
};
