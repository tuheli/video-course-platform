import { Stack } from '@mui/material';
import { AddMoreButtonDarkVariant } from '../../manage-course-goals-page/AddMoreButtonDarkVariant';
import { useState } from 'react';
import { DesctiptionEditor } from './DescriptionEditor';

export const BottomExtension = () => {
  const [isDescriptionEditorVisible, setIsDescriptionEditorVisible] =
    useState(false);

  const onClickDescriptionButton = () => {
    setIsDescriptionEditorVisible(true);
  };

  const closeDescriptionEditor = () => {
    setIsDescriptionEditorVisible(false);
  };

  return (
    <Stack
      onMouseDown={(event) => event.stopPropagation()}
      sx={{
        width: '100%',
        gap: 1,
        p: 1,
        border: '1px solid',
        borderTop: 'none',
        borderColor: 'text.primary',
        bgcolor: 'background.default',
      }}
    >
      {!isDescriptionEditorVisible && (
        <AddMoreButtonDarkVariant
          text="Description"
          onClick={onClickDescriptionButton}
          sx={{
            minWidth: 140,
          }}
        />
      )}
      {isDescriptionEditorVisible && (
        <DesctiptionEditor closeEditor={closeDescriptionEditor} />
      )}
      <AddMoreButtonDarkVariant
        text="Resources"
        onClick={() => {}}
        sx={{
          minWidth: 140,
        }}
      />
    </Stack>
  );
};
