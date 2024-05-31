import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import { inputSx, inputOuterDivSx } from './common';
import { useCurriculumSectionContext } from '../../hooks/useCurriculumSectionContext';
import { InputFieldWithMaxCharacters } from '../course-creation/course-creation-flow/InputFieldWithMaxCharacters';

interface NewCurriculumItemLayoutProps {
  title: string;
  titleValue: string;
  saveButtonText: string;
  children?: React.ReactNode;
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickCancel: () => void;
  onClickSave: () => void;
}

export const EditCurriculumItemLayout = ({
  title,
  titleValue,
  saveButtonText,
  children,
  onChangeTitle,
  onClickCancel,
  onClickSave,
}: NewCurriculumItemLayoutProps) => {
  const { setIsOptionsAnimationEnabled } = useCurriculumSectionContext();

  const onClickCancelWithDisableOptionsAnimation = () => {
    setIsOptionsAnimationEnabled(false);
    onClickCancel();
  };

  return (
    <Paper
      sx={{
        p: 1,
        border: '1px solid',
        borderColor: 'text.primary',
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          gap: 2,
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
