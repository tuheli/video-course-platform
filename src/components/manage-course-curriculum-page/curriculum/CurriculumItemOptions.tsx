import { Box, Stack } from '@mui/material';
import { AddMoreButton } from '../../manage-course-goals-page/AddMoreButton';
import AddIcon from '@mui/icons-material/Add';
import { useEnableActionTimer } from '../../../hooks/useEnableActionTimer';
import { animationDurationSeconds } from './common';

interface CurriculumItemOptionsProps {
  setVisibility: (isVisible: boolean) => void;
}

export const CurriculumItemOptions = ({
  setVisibility,
}: CurriculumItemOptionsProps) => {
  const { isEnabled } = useEnableActionTimer(animationDurationSeconds * 1000);

  const isClickAllowed = isEnabled;

  const onClickCloseIcon = () => {
    if (!isClickAllowed) return;
    setVisibility(false);
  };

  return (
    <Box
      sx={{
        p: 0,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 11,
          left: 11,
          animation: 'closeIconMoveAnimation 1s ease-out forwards',
        }}
      >
        <Box
          onClick={onClickCloseIcon}
          sx={{
            transform: 'rotate(45deg)',
            animation: 'closeIconRollAnimation 1s ease-out forwards',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        >
          <AddIcon />
        </Box>
      </Box>
      <Stack
        sx={{
          flexDirection: 'row',
          gap: 1,
          border: '1px dashed',
          borderColor: 'text.primary',
          animation: 'opacityAnimation 1s ease-in forwards',
        }}
      >
        <AddLectureButton />
        <AddLectureButton />
        <AddLectureButton />
        <AddLectureButton />
      </Stack>
    </Box>
  );
};

const AddLectureButton = () => {
  const onClick = () => {};

  return (
    <AddMoreButton
      text="Lecture"
      onClick={onClick}
      sx={{
        pl: 1,
        color: 'secondary.main',
        bgcolor: 'inherit',
        '&:hover': {
          cursor: 'pointer',
          color: 'secondary.dark',
        },
      }}
    />
  );
};
