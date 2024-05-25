import { isValidStepNumber } from '../../../../features/courseCreationSlice';
import { ChangeStepButton } from './ChangeStepButton';
import { StepChangeProps } from './common';

interface ContinueStepButtonProps extends StepChangeProps {
  isAbleToContinue: boolean;
}

export const ContinueStepButton = ({
  currentStep,
  isAbleToContinue,
}: ContinueStepButtonProps) => {
  const nextStep = currentStep + 1;

  if (!isValidStepNumber(nextStep)) {
    return null;
  }

  return (
    <ChangeStepButton
      text="Continue"
      nextStep={nextStep}
      isButtonDisabled={!isAbleToContinue}
    />
  );
};
