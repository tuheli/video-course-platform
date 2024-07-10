import { Box, Stack, Typography } from '@mui/material';
import { ICurriculumSection } from '../../features/courseDraftsSlice';
import { useState } from 'react';
import { BottomExtensionOpener } from '../curriculum/lecture/BottomExtensionOpener';
import { VideoPreviewSelection } from './Layout';

interface SidebarSectionProps {
  coursedraftId: number;
  section: ICurriculumSection;
  index: number;
  onClickLecture: (state: VideoPreviewSelection) => void;
}

export const SidebarSection = ({
  coursedraftId,
  section,
  index,
  onClickLecture,
}: SidebarSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sortedLessons = [...section.lessons].sort(
    (a, b) => a.orderIndex - b.orderIndex
  );

  const onClick = () => {
    setIsExpanded((previousValue) => !previousValue);
  };

  return (
    <Stack>
      <Stack
        onClick={onClick}
        sx={{
          bgcolor: 'background.paper',
          p: 2,
          cursor: 'pointer',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
            }}
          >
            Section {index + 1}: {section.title}
          </Typography>
          <Box onClick={(event) => event.stopPropagation()}>
            <BottomExtensionOpener isOpen={isExpanded} setIsOpen={onClick} />
          </Box>
        </Box>
        <Typography variant="caption">
          {0} / {section.lessons.length} | {0}min
        </Typography>
      </Stack>
      {isExpanded && section.lessons.length > 0 ? (
        <Stack
          sx={{
            bgcolor: 'background.paper',
          }}
        >
          {sortedLessons.map((lesson, index) => {
            return (
              <Box
                key={lesson.id}
                onClick={() =>
                  onClickLecture({
                    coursedraftId,
                    sectionId: section.id,
                    lectureId: lesson.id,
                  })
                }
                sx={{
                  px: 2,
                  py: 0.5,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'background.paperDarker',
                  },
                }}
              >
                <Typography variant="caption">
                  {index + 1}. {lesson.name}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      ) : (
        isExpanded && (
          <Box
            sx={{
              bgcolor: 'background.paper',
              px: 2,
            }}
          >
            <Typography variant="caption">
              This section has no lessons.
            </Typography>
          </Box>
        )
      )}
    </Stack>
  );
};
