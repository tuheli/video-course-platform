import { Typography } from '@mui/material';
import { InputFieldWithMaxCharacters } from '../../../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { useAppDispatch } from '../../../../app/hooks';
import { useCurriculumSectionContext } from '../../../../hooks/useCurriculumSectionContext';
import { ChangeEvent } from 'react';
import { updatedCurriculumSectionText } from '../../../../features/courseDraftsSlice';
import { inputOuterDivSx, inputSx } from '../common';
import { EditCurriculumItemLayout } from '../EditCurriculumItemLayout';

interface EditSectionTitleAndLearningObjectiveProps {
  changeHeadingVisibility: (isVisible: boolean) => void;
}

export const EditSectionTitleAndLearningObjective = ({
  changeHeadingVisibility,
}: EditSectionTitleAndLearningObjectiveProps) => {
  const { courseDraftId, curriculumSection, index } =
    useCurriculumSectionContext();

  const dispatch = useAppDispatch();

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

  const onClickSaveSection = () => {
    changeHeadingVisibility(true);
  };

  return (
    <EditCurriculumItemLayout
      onChangeTitle={onChangeTitle}
      onClickCancel={onClickCancel}
      onClickSave={onClickSaveSection}
      saveButtonText="Save Section"
      title={`Section ${index + 1}:`}
      titleValue={curriculumSection.title}
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
    </EditCurriculumItemLayout>
  );
};
