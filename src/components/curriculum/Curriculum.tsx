import { Stack } from '@mui/material';
import { Section } from './section/Section';
import { useCurriculum } from '../../hooks/useCurriculum';
import { AddSectionButton } from './section/AddSectionButton';

export const Curriculum = () => {
  const { curriculum, courseDraft } = useCurriculum();

  if (!courseDraft) return null;

  return (
    <Stack
      sx={{
        flexDirection: 'column',
        gap: 4,
      }}
    >
      {curriculum.map((curriculumSection, index) => (
        <Section
          key={curriculumSection.id}
          curriculumSection={curriculumSection}
          courseDraftId={courseDraft.id}
          index={index}
        />
      ))}
      <AddSectionButton />
    </Stack>
  );
};
