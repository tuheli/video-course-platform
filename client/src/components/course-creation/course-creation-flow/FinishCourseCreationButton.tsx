import { Button } from '@mui/material';
import { stepButtonWidth } from './change-step-buttons/common';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  NewCourseDraftEntry,
  createdCourseDraft,
} from '../../../features/courseDraftsSlice';
import { useNavigate } from 'react-router-dom';

interface FinishCourseCreationButtonProps {
  isAbleToFinish: boolean;
}

export const FinishCourseCreationButton = ({
  isAbleToFinish,
}: FinishCourseCreationButtonProps) => {
  const signedInUser = useAppSelector((state) => state.me.user);
  const { step1, step2, step3, step4 } = useAppSelector(
    (state) => state.courseCreation.steps
  );
  const dispatch = useAppDispatch();
  const navigage = useNavigate();

  const onClickFinish = () => {
    if (!isAbleToFinish) {
      return;
    }

    if (
      !signedInUser ||
      !step1.courseType ||
      !step2.title ||
      !step3.category ||
      !step4.timeAvailablePerWeek
    ) {
      return;
    }

    const newEntry: NewCourseDraftEntry = {
      creatorEmail: signedInUser.email,
      courseType: step1.courseType,
      courseTitle: step2.title,
      courseCategory: step3.category,
      creatorTimeAvailablePerWeek: step4.timeAvailablePerWeek,
    };

    dispatch(createdCourseDraft(newEntry));
    navigage('/instructor');
  };

  return (
    <Button
      disabled={!isAbleToFinish}
      variant="contained"
      color="primary"
      sx={{
        minWidth: stepButtonWidth,
      }}
      onClick={onClickFinish}
    >
      Create Course
    </Button>
  );
};
