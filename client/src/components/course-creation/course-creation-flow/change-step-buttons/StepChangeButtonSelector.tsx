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

  const isPreviousButtonVisible = currentStep > 1;
  const isContinueButtonVisible = currentStep < totalSteps;
  const isFinishButtonVisible = currentStep === totalSteps;
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
        {isPreviousButtonVisible && (
          <PreviousStepButton currentStep={currentStep} />
        )}
        <div
          style={{
            flexGrow: isPreviousButtonVisible ? 1 : 0,
            transition: 'flex-grow 0.5s',
          }}
        />
        {isContinueButtonVisible && (
          <ContinueStepButton
            currentStep={currentStep}
            isAbleToContinue={isAbleToContinueOrFinish}
          />
        )}
        {isFinishButtonVisible && (
          <FinishCourseCreationButton
            isAbleToFinish={isAbleToContinueOrFinish}
          />
        )}
      </Stack>
    </Paper>
  );
};
