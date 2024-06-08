import { Box, Paper, Stack, SxProps, Typography } from '@mui/material';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import { useEditableCurriculumItem } from '../../hooks/useEditableCurriculumItem';
import { DeleteButton } from '../curriculum/DeleteButton';
import { EditButton } from '../curriculum/EditButton';
import { useDragAndDropContext } from './useDragAndDropContext';
import DraghandleV2 from './DraghandleV2';

interface HeadingProps {
  itemName: 'Section' | 'Lecture';
  title: string;
  index: number;
  paperSx?: SxProps;
  titleSx?: SxProps;
  outerStackSx?: SxProps;
  leftStackSx?: SxProps;
  children?: React.ReactNode;
  changeHeadingVisibility: (isVisible: boolean) => void;
  onClickDeleteIcon: () => void;
}

export const HeadingV2 = ({
  itemName,
  title,
  index,
  paperSx,
  titleSx,
  outerStackSx,
  leftStackSx,
  children,
  changeHeadingVisibility,
  onClickDeleteIcon,
}: HeadingProps) => {
  const { currentlyDraggedItemId } = useDragAndDropContext();
  const isDraggingSomething = Boolean(currentlyDraggedItemId);

  const {
    isEditButtonVisible,
    isDeleteButtonVisible,
    areChildrenVisible,
    onMouseEnter,
    onMouseLeave,
  } = useEditableCurriculumItem(!isDraggingSomething);

  return (
    <Paper
      sx={{
        p: 1,
        py: 1.5,
        border: '1px solid',
        ...paperSx,
      }}
    >
      <Stack
        sx={{
          ...outerStackSx,
        }}
      >
        <Stack
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          sx={{
            flexDirection: 'row',
            gap: 1,
            minHeight: 32,
            display: 'flex',
            alignItems: 'center',
            ...leftStackSx,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              ...titleSx,
            }}
          >
            {itemName} {index + 1}:
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <NoteOutlinedIcon
              sx={{
                transform: 'scaleX(0.63)',
                fontSize: 21,
              }}
            />
          </Box>
          {title && <Typography>{title}</Typography>}
          {isEditButtonVisible && (
            <EditButton changeHeadingVisibility={changeHeadingVisibility} />
          )}
          {isDeleteButtonVisible && (
            <Box
              sx={{
                marginRight: 'auto',
              }}
            >
              <DeleteButton onClick={onClickDeleteIcon} />
            </Box>
          )}
          {areChildrenVisible && children}
        </Stack>
        <DraghandleV2 />
      </Stack>
    </Paper>
  );
};
