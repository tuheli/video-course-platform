import { Box, Stack, Typography } from '@mui/material';
import { ICurriculumSection, Lesson } from '../../features/courseDraftsSlice';
import { useState } from 'react';
import { BottomExtensionOpener } from '../curriculum/lecture/BottomExtensionOpener';

interface SidebarSectionProps {
  section: ICurriculumSection;
  index: number;
  onClickLecture: (lecture: Lesson) => void;
}

export const SidebarSection = ({
  section,
  index,
  onClickLecture,
}: SidebarSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
          {section.lessons.map((lesson, index) => {
            return (
              <Box
                key={lesson.id}
                onClick={() => onClickLecture(lesson)}
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
