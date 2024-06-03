import { Box, Stack, Typography } from '@mui/material';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import { useEditableCurriculumItem } from '../../hooks/useEditableCurriculumItem';
import { EditButton } from './EditButton';
import { DeleteButton } from './DeleteButton';

interface HeadingProps {
  itemName: 'Section' | 'Lecture';
  title: string;
  index: number;
  changeHeadingVisibility: (isVisible: boolean) => void;
  onClickDeleteIcon: () => void;
}

export const Heading = ({
  itemName,
  title,
  index,
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
    <Stack
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        flexDirection: 'row',
        gap: 1,
        p: 1,
        py: 1.5,
        border: '1px solid',
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
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
  );
};
