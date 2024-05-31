import { Paper, Stack } from '@mui/material';
import { ICurriculumSection } from '../../../../features/courseDraftsSlice';
import { CurriculumSectionContext } from '../../../../contexts/CurriculumSectionContext';
import { SectionEditingHeading } from '../SectionEditingHeading';
import { EditSectionTitleAndLearningObjective } from './EditSectionTitleAndLearningObjective';
import { useEditableCurriculumItem } from '../../../../hooks/useEditableCurriculumItem';

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
  const {
    isHeadingPartVisible,
    isDeleteButtonVisible,
    isEditButtonVisible,
    onMouseEnter,
    onMouseLeave,
    changeHeadingVisibility,
  } = useEditableCurriculumItem();

  return (
    <CurriculumSectionContext.Provider
      value={{ courseDraftId, curriculumSection, index }}
    >
      <Paper
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        sx={{
          bgcolor: 'background.paperDarker',
          border: '1px solid',
          borderColor: 'text.primary',
          p: 1,
        }}
      >
        <Stack
          sx={{
            flexDirection: 'column',
          }}
        >
          {isHeadingPartVisible && (
            <SectionEditingHeading
              isDeleteButtonVisible={isDeleteButtonVisible}
              isEditSectionButtonVisible={isEditButtonVisible}
              changeHeadingVisibility={changeHeadingVisibility}
            />
          )}
          {!isHeadingPartVisible && (
            <EditSectionTitleAndLearningObjective
              changeHeadingVisibility={changeHeadingVisibility}
            />
          )}
        </Stack>
      </Paper>
    </CurriculumSectionContext.Provider>
  );
};
