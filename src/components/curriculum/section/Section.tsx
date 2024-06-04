import { Paper, Stack, Typography } from '@mui/material';
import { ItemSelection } from '../ItemSelection';
import { ChangeEvent, useState } from 'react';
import {
  ICurriculumSection,
  deletedCurriculumSection,
  updatedCurriculumSectionText,
} from '../../../features/courseDraftsSlice';
import {
  CurriculumSectionContext,
  EditableItemType,
} from '../../../contexts/CurriculumSectionContext';
import { useEditableCurriculumItem } from '../../../hooks/useEditableCurriculumItem';
import { Lecture } from '../lecture/Lecture';
import { Heading } from '../Heading';
import { useAppDispatch } from '../../../app/hooks';
import { EditHeading } from '../EditHeading';
import { InputFieldWithMaxCharacters } from '../../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { inputOuterDivSx, inputSx } from '../common';
import { Draghandle } from '../../drag-and-drop/Draghandle';
import { useDraggableContext } from '../../../hooks/useDraggableContext';

interface SectionProps {
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

export const Section = ({
  courseDraftId,
  curriculumSection,
  index,
}: SectionProps) => {
  const [editingItemType, setEditingItemType] = useState<
    EditableItemType | undefined
  >(undefined);
  const [isOptionsAnimationEnabled, setIsOptionsAnimationEnabled] =
    useState(true);
  const { isBeingDragged } = useDraggableContext();

  const dispatch = useAppDispatch();

  const {
    isHeadingVisible,
    onMouseEnter,
    onMouseLeave,
    changeHeadingVisibility,
  } = useEditableCurriculumItem();

  const lectures = curriculumSection.lessons;
  const isEditVisible = !isHeadingVisible;

  const onClickDeleteIcon = () => {
    dispatch(
      deletedCurriculumSection({
        courseDraftId,
        curriculumSectionId: curriculumSection.id,
      })
    );
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updatedCurriculumSectionText({
        courseDraftId,
        curriculumSectionId: curriculumSection.id,
        newValue: event.target.value,
        type: 'title',
      })
    );
  };

  const onChangeLearningObjective = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updatedCurriculumSectionText({
        courseDraftId,
        curriculumSectionId: curriculumSection.id,
        newValue: event.target.value,
        type: 'learningObjective',
      })
    );
  };

  const onClickCancel = () => {
    changeHeadingVisibility(true);
  };

  const onClickSave = () => {
    changeHeadingVisibility(true);
  };

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
          outline: isBeingDragged ? '2px solid' : 'none',
          outlineColor: 'secondary.light',
          borderColor: isBeingDragged ? 'transparent' : 'text.primary',
          p: 1,
        }}
      >
        <Stack
          sx={{
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {isHeadingVisible && (
            <Heading
              itemName="Section"
              index={index}
              title={curriculumSection.title}
              changeHeadingVisibility={changeHeadingVisibility}
              onClickDeleteIcon={onClickDeleteIcon}
              paperSx={{
                bgcolor: 'background.paperDarker',
                // Hides border but keeps size
                // consistent with editheading component
                borderColor: 'background.paperDarker',
              }}
              outerStackSx={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              leftStackSx={{
                flexGrow: 1,
              }}
            >
              <Draghandle
                sx={{
                  border: 'none',
                }}
              />
            </Heading>
          )}
          {isEditVisible && (
            <EditHeading
              title={`Section ${index + 1}:`}
              titleValue={curriculumSection.title}
              saveButtonText="Save Section"
              onChangeTitle={onChangeTitle}
              onClickCancel={onClickCancel}
              onClickSave={onClickSave}
              titleSx={{
                fontWeight: 600,
              }}
            >
              <>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  What will students be able to do at the end of this section?
                </Typography>
                <InputFieldWithMaxCharacters
                  onChange={onChangeLearningObjective}
                  maxInputLength={80}
                  value={curriculumSection.learningObjective}
                  placeholder="Enter a learning objective"
                  autofocus={false}
                  outerDivSx={{
                    ...inputOuterDivSx,
                  }}
                  inputSx={{
                    ...inputSx,
                  }}
                />
              </>
            </EditHeading>
          )}
          <Stack
            sx={{
              flexDirection: 'column',
              mt: 2,
              pl: 6,
              pr: 0,
              gap: 2,
            }}
          >
            {lectures.map((lecture, index) => {
              return (
                <Lecture key={lecture.id} lecture={lecture} index={index} />
              );
            })}
            <ItemSelection />
          </Stack>
        </Stack>
      </Paper>
    </CurriculumSectionContext.Provider>
  );
};
