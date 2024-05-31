import { Paper, Stack } from '@mui/material';
import { ICurriculumSection } from '../../../../features/courseDraftsSlice';
import {
  CurriculumSectionContext,
  EditableItem,
} from '../../../../contexts/CurriculumSectionContext';
import { SectionEditingHeading } from '../SectionEditingHeading';
import { EditSectionTitleAndLearningObjective } from './EditSectionTitleAndLearningObjective';
import { useEditableCurriculumItem } from '../../../../hooks/useEditableCurriculumItem';
import { CurriculumItemSelection } from '../CurriculumItemSelection';
import { useState } from 'react';

interface CurriculumSectionProps {
  courseDraftId: string;
  curriculumSection: ICurriculumSection;
  index: number;
}

// NOTE: Editing items are closed by setting
// the editingItemType to undefined and shown
// by setting the type.

// NOTE: This components nested hierarchy is a bit
// complex partly because the rolling close button
// animations use specific child parent relationship.

export const CurriculumSection = ({
  courseDraftId,
  curriculumSection,
  index,
}: CurriculumSectionProps) => {
  const [editingItemType, setEditingItemType] = useState<
    EditableItem | undefined
  >(undefined);
  const [isOptionsAnimationEnabled, setIsOptionsAnimationEnabled] =
    useState(true);

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
      value={{
        courseDraftId,
        curriculumSection,
        index,
        editingItemType,
        isOptionsAnimationEnabled,
        setIsOptionsAnimationEnabled,
        setEditingItemType,
      }}
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
            gap: 2,
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
          <Stack
            sx={{
              flexDirection: 'column',
              mt: 2,
              pl: 6,
              pr: 1,
            }}
          >
            <CurriculumItemSelection />
          </Stack>
        </Stack>
      </Paper>
    </CurriculumSectionContext.Provider>
  );
};
