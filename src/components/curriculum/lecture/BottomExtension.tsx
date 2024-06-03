import { Paper, Stack } from '@mui/material';
import { AddMoreButtonDarkVariant } from '../../manage-course-goals-page/AddMoreButtonDarkVariant';

// For consistent size
const minButtoWidth = 140;

export const BottomExtension = () => {
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
        <AddMoreButtonDarkVariant
          text="Description"
          onClick={() => {}}
          sx={{
            minWidth: minButtoWidth,
          }}
        />
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
