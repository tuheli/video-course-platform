import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  ValidStepNumber,
  changedStep,
} from '../../../../features/courseCreationSlice';
import { useAppDispatch } from '../../../../app/hooks';
import { stepButtonWidth } from './common';

interface StepButtonProps {
  nextStep: ValidStepNumber;
  text: string;
  isButtonDisabled?: boolean;
}

export const ChangeStepButton = ({
  nextStep,
  text,
  isButtonDisabled,
}: StepButtonProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    dispatch(changedStep(nextStep));
    navigate(`/course/create/${nextStep}`);
  };

  return (
    <Button
      disabled={isButtonDisabled}
      variant={text === 'Continue' ? 'contained' : 'outlined'}
      color="primary"
      onClick={onClick}
      sx={{
        width: stepButtonWidth,
      }}
    >
      {text}
    </Button>
  );
};
