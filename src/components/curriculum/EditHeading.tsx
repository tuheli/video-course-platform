import { Box, Button, Paper, Stack, SxProps, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import { inputSx, inputOuterDivSx } from './common';
import { useCurriculumSectionContext } from '../../hooks/useCurriculumSectionContext';
import { InputFieldWithMaxCharacters } from '../course-creation/course-creation-flow/InputFieldWithMaxCharacters';

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
  const { setIsOptionsAnimationEnabled } = useCurriculumSectionContext();

  const onClickCancelWithDisableOptionsAnimation = () => {
    setIsOptionsAnimationEnabled(false);
    onClickCancel();
  };

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
          <Stack
            sx={{
              flexDirection: 'row',
              marginLeft: 'auto',
              gap: 1,
            }}
          >
            <Button
              onClick={onClickCancelWithDisableOptionsAnimation}
              variant="text"
              color="primary"
              sx={{
                height: 32,
                p: 1,
                fontWeight: 600,
                '&:hover': {
                  color: 'text.primary',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={onClickSave}
              variant="contained"
              color="primary"
              sx={{
                height: 32,
                p: 1,
                fontWeight: 600,
                transition: 'none',
              }}
            >
              {saveButtonText}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};