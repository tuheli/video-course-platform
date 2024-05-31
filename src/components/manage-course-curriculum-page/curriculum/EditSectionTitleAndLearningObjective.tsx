import { Button, Paper, Stack, Typography } from '@mui/material';
import { InputFieldWithMaxCharacters } from '../../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { useAppDispatch } from '../../../app/hooks';
import { useCurriculumSectionContext } from '../../../hooks/useCurriculumSectionContext';
import { ChangeEvent } from 'react';
import { updatedCurriculumSectionText } from '../../../features/courseDraftsSlice';

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
    <Paper
      sx={{
        p: 1,
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
          }}
        >
          Section {index + 1}:
        </Typography>
        <Stack
          sx={{
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <InputFieldWithMaxCharacters
            onChange={onChangeTitle}
            maxInputLength={80}
            value={curriculumSection.title}
            placeholder="Enter a title"
            autofocus={true}
            sx={{
              height: 28,
              pl: 1,
              mb: 1,
            }}
            placeholderSx={{
              fontSize: 14,
            }}
          />
          <Typography
            sx={{
              fontWeight: 500,
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
            sx={{
              height: 28,
              pl: 1,
              mb: 1,
            }}
            placeholderSx={{
              fontSize: 14,
            }}
          />
          <Stack
            sx={{
              flexDirection: 'row',
              marginLeft: 'auto',
              gap: 1,
            }}
          >
            <Button
              onClick={onClickCancel}
              variant="text"
              color="primary"
              sx={{
                height: 32,
                p: 1,
                fontWeight: 600,
                '&:hover': {
                  color: 'text.primary',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={onClickSaveSection}
              variant="contained"
              color="primary"
              sx={{
                height: 32,
                p: 1,
                fontWeight: 600,
                transition: 'none',
              }}
            >
              Save section
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};
