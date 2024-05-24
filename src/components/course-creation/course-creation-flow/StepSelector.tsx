import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';
import { Step3 } from './steps/Step3';
import { resetCourseCreation } from '../../../features/courseCreationSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Step4 } from './steps/Step4';

export const StepSelector = () => {
  const { currentStep } = useAppSelector((state) => state.courseCreation);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { step } = useParams();

  useEffect(() => {
    const isStepValid = (step: string | undefined) => {
      const stepNumber = Number(step);

      if (isNaN(stepNumber)) {
        return false;
      }

      if (currentStep !== stepNumber) {
        return false;
      }

      return true;
    };

    if (!isStepValid(step)) {
      dispatch(resetCourseCreation());
      navigate('/course/create/1');
      return;
    }
  }, [step, currentStep, navigate, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetCourseCreation());
    };
  }, [dispatch]);

  switch (currentStep) {
    case 1:
      return <Step1 />;
    case 2:
      return <Step2 />;
    case 3:
      return <Step3 />;
    case 4:
      return <Step4 />;
    default:
      return <></>;
  }
};
