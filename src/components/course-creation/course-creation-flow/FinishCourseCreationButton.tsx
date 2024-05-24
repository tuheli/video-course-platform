import { Button } from '@mui/material';
import { stepButtonWidth } from './change-step-buttons/common';

export const FinishCourseCreationButton = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        width: stepButtonWidth,
      }}
    >
      Finish
    </Button>
  );
};
