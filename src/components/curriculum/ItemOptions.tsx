import { Box, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { animationDurationSeconds } from './common';
import { AddableItemOptionButton } from './lecture/AddLectureButton';
import { EditSelector } from './EditSelector';
import { useEnableActionTimer } from '../../hooks/useEnableActionTimer';
import { useCurriculumSectionContext } from '../../hooks/useCurriculumSectionContext';

interface ItemOptionsProps {
  setVisibility: (isVisible: boolean) => void;
}

export const ItemOptions = ({ setVisibility }: ItemOptionsProps) => {
  const { isEnabled } = useEnableActionTimer(animationDurationSeconds * 1000);
  const {
    editingItemType,
    isOptionsAnimationEnabled,
    setIsOptionsAnimationEnabled,
  } = useCurriculumSectionContext();

  const isEditableCurriculumItemSelectorVisible = editingItemType !== undefined;

  const isAddButtonsVisible = !isEditableCurriculumItemSelectorVisible;

  const isClickAllowed = isEnabled;

  const onClickCloseIcon = () => {
    if (!isClickAllowed) return;
    setIsOptionsAnimationEnabled(true);
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
          transform: !isOptionsAnimationEnabled
            ? 'translateX(-150%) translateY(-150%)'
            : undefined,
          animation: isOptionsAnimationEnabled
            ? `closeIconMoveAnimation ${animationDurationSeconds}s ease-out forwards`
            : undefined,
        }}
      >
        <Box
          onClick={onClickCloseIcon}
          sx={{
            transform: isOptionsAnimationEnabled
              ? 'rotate(45deg)'
              : 'rotate(-315deg)',
            animation: isOptionsAnimationEnabled
              ? `closeIconRollAnimation ${animationDurationSeconds}s ease-out forwards`
              : undefined,
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
      {isAddButtonsVisible && (
        <Stack
          sx={{
            flexDirection: 'row',
            gap: 1,
            border: '1px dashed',
            borderColor: 'text.primary',
            animation: isOptionsAnimationEnabled
              ? `opacityAnimation ${0.3}s ease-in forwards`
              : undefined,
          }}
        >
          <AddableItemOptionButton text="Lecture" type="addLecture" />
          {/** Just for displaying more options - these dont do anything */}
          <AddableItemOptionButton text="Quiz" type={undefined} />
          <AddableItemOptionButton text="Coding Exercise" type={undefined} />
          <AddableItemOptionButton text="Assignment" type={undefined} />
        </Stack>
      )}
      {isEditableCurriculumItemSelectorVisible && <EditSelector />}
    </Box>
  );
};
