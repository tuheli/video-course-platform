import { Stack } from '@mui/material';
import { CurriculumSection } from './section/CurriculumSection';
import { AddCurriculumSectionButton } from './AddCurriculumSectionButton';
import { useCurriculum } from '../../hooks/useCurriculum';

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
        <CurriculumSection
          key={curriculumSection.id}
          curriculumSection={curriculumSection}
          courseDraftId={courseDraft.id}
          index={index}
        />
      ))}
      <AddCurriculumSectionButton />
    </Stack>
  );
};
