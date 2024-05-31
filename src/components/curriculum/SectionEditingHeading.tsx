import { Box, Stack, Typography } from '@mui/material';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import { DeleteIconButton } from './DeleteIconButton';
import { EditIconButton } from './EditIconButton';
import { useCurriculumSectionContext } from '../../hooks/useCurriculumSectionContext';
import { useAppDispatch } from '../../app/hooks';
import { deletedCurriculumSection } from '../../features/courseDraftsSlice';

interface SectionEditingHeadingProps {
  isDeleteButtonVisible: boolean;
  isEditSectionButtonVisible: boolean;
  changeHeadingVisibility: (isVisible: boolean) => void;
}

export const SectionEditingHeading = ({
  isDeleteButtonVisible,
  isEditSectionButtonVisible,
  changeHeadingVisibility,
}: SectionEditingHeadingProps) => {
  const { index, courseDraftId, curriculumSection } =
    useCurriculumSectionContext();

  const dispatch = useAppDispatch();

  const onClickDeleteButton = () => {
    dispatch(
      deletedCurriculumSection({
        courseDraftId,
        curriculumSectionId: curriculumSection.id,
      })
    );
  };

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        gap: 1,
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
        }}
      >
        Section {index + 1}:
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
      <Typography>{curriculumSection.title}</Typography>
      {isEditSectionButtonVisible && (
        <EditIconButton changeHeadingVisibility={changeHeadingVisibility} />
      )}
      {isDeleteButtonVisible && (
        <DeleteIconButton onClick={onClickDeleteButton} />
      )}
    </Stack>
  );
};
