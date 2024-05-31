import { Box, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEnableActionTimer } from '../../../hooks/useEnableActionTimer';
import { animationDurationSeconds } from './common';
import { AddLectureButton } from './lecture/AddLectureButton';
import { EditableCurriculumItemSelector } from './EditableCurriculumItemSelector';
import { useCurriculumSectionContext } from '../../../hooks/useCurriculumSectionContext';

interface CurriculumItemOptionsProps {
  setVisibility: (isVisible: boolean) => void;
}

export const CurriculumItemOptions = ({
  setVisibility,
}: CurriculumItemOptionsProps) => {
  const { isEnabled } = useEnableActionTimer(animationDurationSeconds * 1000);
  const { editingItemType, isOptionsAnimationEnabled } =
    useCurriculumSectionContext();

  const isEditableCurriculumItemSelectorVisible = editingItemType !== undefined;
  const isAddButtonsVisible = !isEditableCurriculumItemSelectorVisible;

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
          animation: `closeIconMoveAnimation ${animationDurationSeconds}s ease-out forwards`,
        }}
      >
        <Box
          onClick={onClickCloseIcon}
          sx={{
            transform: 'rotate(45deg)',
            animation: `closeIconRollAnimation ${animationDurationSeconds}s ease-out forwards`,
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
          <AddLectureButton />
        </Stack>
      )}
      {isEditableCurriculumItemSelectorVisible && (
        <EditableCurriculumItemSelector />
      )}
    </Box>
  );
};
