import { Paper, Stack } from '@mui/material';
import { SectionEditingHeading } from '../SectionEditingHeading';
import { EditSectionTitleAndLearningObjective } from './EditSectionTitleAndLearningObjective';
import { CurriculumItemSelection } from '../CurriculumItemSelection';
import { useState } from 'react';
import { ICurriculumSection } from '../../../features/courseDraftsSlice';
import {
  CurriculumSectionContext,
  EditableItemType,
} from '../../../contexts/CurriculumSectionContext';
import { useEditableCurriculumItem } from '../../../hooks/useEditableCurriculumItem';
import { LectureItem } from '../lecture/LectureItem';

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
    EditableItemType | undefined
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

  const lectures = curriculumSection.lessons;

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
              gap: 2,
            }}
          >
            {lectures.map((lecture, index) => {
              return (
                <LectureItem key={lecture.id} lecture={lecture} index={index} />
              );
            })}
            <CurriculumItemSelection />
          </Stack>
        </Stack>
      </Paper>
    </CurriculumSectionContext.Provider>
  );
};
