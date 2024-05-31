import { Box, Stack, Typography } from '@mui/material';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import { DeleteCurriculumSectionButton } from './DeleteCurriculumSectionButton';
import { useCurriculumSectionContext } from '../../../hooks/useCurriculumSectionContext';
import { EditSectionTitleAndLearningObjectiveButton } from './EditSectionTitleAndLearningObjectiveButton';

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
        <EditSectionTitleAndLearningObjectiveButton
          changeHeadingVisibility={changeHeadingVisibility}
        />
      )}
      {isDeleteButtonVisible && (
        <DeleteCurriculumSectionButton
          courseDraftId={courseDraftId}
          curriculumSectionId={curriculumSection.id}
        />
      )}
    </Stack>
  );
};
