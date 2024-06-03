import { Box, Paper, Stack, SxProps, Typography } from '@mui/material';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import { useEditableCurriculumItem } from '../../hooks/useEditableCurriculumItem';
import { EditButton } from './EditButton';
import { DeleteButton } from './DeleteButton';

interface HeadingProps {
  itemName: 'Section' | 'Lecture';
  title: string;
  index: number;
  paperSx?: SxProps;
  titleSx?: SxProps;
  changeHeadingVisibility: (isVisible: boolean) => void;
  onClickDeleteIcon: () => void;
}

export const Heading = ({
  itemName,
  title,
  index,
  paperSx,
  titleSx,
  changeHeadingVisibility,
  onClickDeleteIcon,
}: HeadingProps) => {
  const {
    isEditButtonVisible,
    isDeleteButtonVisible,
    onMouseEnter,
    onMouseLeave,
  } = useEditableCurriculumItem();

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
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        sx={{
          flexDirection: 'row',
          gap: 1,
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
        {isDeleteButtonVisible && <DeleteButton onClick={onClickDeleteIcon} />}
      </Stack>
    </Paper>
  );
};
