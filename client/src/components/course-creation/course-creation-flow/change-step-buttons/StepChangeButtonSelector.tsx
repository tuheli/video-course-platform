import { Paper, Stack } from '@mui/material';
import { ContinueStepButton } from './ContinueStepButton';
import { PreviousStepButton } from './PreviousStepButton';
import { useAppSelector } from '../../../../app/hooks';
import { FinishCourseCreationButton } from '../FinishCourseCreationButton';
import { isAbleToContinue } from '../../../../features/courseCreationSlice';

export const StepChangeButtonSelector = () => {
  const { currentStep, totalSteps, steps } = useAppSelector(
    (state) => state.courseCreation
  );

  const showPreviousButton = currentStep > 1;
  const showContinueButton = currentStep < totalSteps;
  const showFinishCourseCreationButton = currentStep === totalSteps;

  const isAbleToContinueOrFinish = isAbleToContinue(currentStep, steps);

  return (
    <Paper
      sx={{
        p: 4,
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        {showPreviousButton && <PreviousStepButton currentStep={currentStep} />}
        <div
          style={{
            flexGrow: showPreviousButton ? 1 : 0,
            transition: 'flex-grow 0.5s',
          }}
        />
        {showContinueButton && (
          <ContinueStepButton
            currentStep={currentStep}
            isAbleToContinue={isAbleToContinueOrFinish}
          />
        )}
        {showFinishCourseCreationButton && (
          <FinishCourseCreationButton
            isAbleToFinish={isAbleToContinueOrFinish}
          />
        )}
      </Stack>
    </Paper>
  );
};
