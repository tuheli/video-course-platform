import { Paper, Stack } from '@mui/material';
import { AddMoreButtonDarkVariant } from '../../manage-course-goals-page/AddMoreButtonDarkVariant';
import { useState } from 'react';
import { DesctiptionEditor } from './DescriptionEditor';

// For consistent size
const minButtoWidth = 140;

export const BottomExtension = () => {
  const [isDescriptionEditorVisible, setIsDescriptionEditorVisible] =
    useState(true);

  const onClickDescriptionButton = () => {
    setIsDescriptionEditorVisible(true);
  };

  return (
    <Paper
      sx={{
        width: '100%',
        borderColor: 'text.primary',
        borderTop: 'none',
        p: 1,
      }}
    >
      <Stack
        sx={{
          gap: 1,
        }}
      >
        {!isDescriptionEditorVisible && (
          <AddMoreButtonDarkVariant
            text="Description"
            onClick={onClickDescriptionButton}
            sx={{
              minWidth: minButtoWidth,
            }}
          />
        )}
        {isDescriptionEditorVisible && <DesctiptionEditor />}
        <AddMoreButtonDarkVariant
          text="Resources"
          onClick={() => {}}
          sx={{
            minWidth: minButtoWidth,
          }}
        />
      </Stack>
    </Paper>
  );
};
