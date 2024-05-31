import { Paper, Stack } from '@mui/material';
import { ICurriculumSection } from '../../../features/courseDraftsSlice';
import { useState } from 'react';
import { CurriculumSectionContext } from '../../../contexts/CurriculumSectionContext';
import { SectionEditingHeading } from './SectionEditingHeading';
import { EditSectionTitleAndLearningObjective } from './EditSectionTitleAndLearningObjective';

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
  const [isHeadingPartVisible, setIsHeadingPartVisible] = useState(true);
  const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);
  const [isEditSectionButtonVisible, setIsEditSectionButtonVisible] =
    useState(false);

  const isEditSectionTitleAndLearningObjectiveVisible = !isHeadingPartVisible;

  const onMouseEnter = () => {
    setIsDeleteButtonVisible(true);
    setIsEditSectionButtonVisible(true);
  };

  const onMouseLeave = () => {
    setIsDeleteButtonVisible(false);
    setIsEditSectionButtonVisible(false);
  };

  const changeHeadingVisibility = (isVisible: boolean) => {
    setIsHeadingPartVisible(isVisible);
  };

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
              isEditSectionButtonVisible={isEditSectionButtonVisible}
              changeHeadingVisibility={changeHeadingVisibility}
            />
          )}
          {isEditSectionTitleAndLearningObjectiveVisible && (
            <EditSectionTitleAndLearningObjective
              changeHeadingVisibility={changeHeadingVisibility}
            />
          )}
        </Stack>
      </Paper>
    </CurriculumSectionContext.Provider>
  );
};
