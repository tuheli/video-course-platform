import { Button, Stack } from '@mui/material';

interface SaveAndCancelButtonProps {
  onClickCancel: () => void;
  onClickSave: () => void;
  saveButtonText: string;
}

export const SaveAndCancelButton = ({
  saveButtonText,
  onClickCancel,
  onClickSave,
}: SaveAndCancelButtonProps) => {
  return (
    <Stack
      onMouseDown={(event) => event.stopPropagation()}
      sx={{
        flexDirection: 'row',
        marginLeft: 'auto',
        gap: 1,
      }}
    >
      <Button
        onClick={onClickCancel}
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
  );
};
