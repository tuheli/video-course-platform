import { Stack } from '@mui/material';
import { Section } from './section/Section';
import { useCurriculumFromParams } from '../../hooks/useCurriculum';
import { AddSectionButton } from './section/AddSectionButton';
import { cleanupCurriculumLocalStorage } from './utils';

interface CurriculumProps {
  forcedCourseId?: string;
}

export const Curriculum = ({ forcedCourseId }: CurriculumProps) => {
  const { curriculum, courseDraft } = useCurriculumFromParams(forcedCourseId);

  if (!courseDraft) return null;

  cleanupCurriculumLocalStorage(courseDraft.id, curriculum);

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
      <AddSectionButton courseDraftId={courseDraft.id} />
    </Stack>
  );
};
