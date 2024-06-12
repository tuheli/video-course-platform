import { isValidStepNumber } from '../../../../features/courseCreationSlice';
import { ChangeStepButton } from './ChangeStepButton';
import { StepChangeProps } from './common';

export const PreviousStepButton = ({ currentStep }: StepChangeProps) => {
  const nextStep = currentStep - 1;

  if (!isValidStepNumber(nextStep)) {
    return null;
  }

  return <ChangeStepButton text="Previous" nextStep={nextStep} />;
};
