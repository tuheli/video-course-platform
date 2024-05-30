import { Box, Paper, Stack, Typography } from '@mui/material';
import { ICurriculumSection } from '../../../features/courseDraftsSlice';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import { useState } from 'react';
import { DeleteCurriculumSectionButton } from './DeleteCurriculumSectionButton';

interface CurriculumSectionProps {
  courseDraftId: string;
  curriculumSection: ICurriculumSection;
  index: number;
}

export const CurriculumSection = ({
  courseDraftId,
  curriculumSection,
  index,
}: CurriculumSectionProps) => {
  const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);

  const onMouseEnter = () => {
    setIsDeleteButtonVisible(true);
  };

  const onMouseLeave = () => {
    setIsDeleteButtonVisible(false);
  };

  return (
    <Paper
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        bgcolor: 'background.paperDarker',
        border: '1px solid',
        borderColor: 'text.primary',
        py: 2,
        px: 1,
      }}
    >
      <Stack
        sx={{
          flexDirection: 'column',
          minHeight: 100,
        }}
      >
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
          <Typography>{curriculumSection.name}</Typography>
          {isDeleteButtonVisible && (
            <DeleteCurriculumSectionButton
              courseDraftId={courseDraftId}
              curriculumSectionId={curriculumSection.id}
            />
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};
