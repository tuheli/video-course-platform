import { Button } from '@mui/material';
import { stepButtonWidth } from './change-step-buttons/common';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { NewCourseDraftEntry } from '../../../features/courseDraftsSlice';
import { useNavigate } from 'react-router-dom';
import { useCreateCourseDraftMutation } from '../../../features/apiSlice';
import { isDataWithMessage, isObjectWithData } from '../../../utils/apiUtils';
import { notified } from '../../../features/notificationSlice';

interface FinishCourseCreationButtonProps {
  isAbleToFinish: boolean;
}

export const FinishCourseCreationButton = ({
  isAbleToFinish,
}: FinishCourseCreationButtonProps) => {
  const signedInUser = useAppSelector((state) => state.userState.user);
  const { step1, step2, step3, step4 } = useAppSelector(
    (state) => state.courseCreation.steps
  );
  const [createCourseDraft] = useCreateCourseDraftMutation();
  const dispatch = useAppDispatch();
  const navigage = useNavigate();

  const onClickFinish = async () => {
    if (!isAbleToFinish) return;

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
      creatorId: signedInUser.id,
      creatorEmail: signedInUser.email,
      courseType: step1.courseType,
      courseTitle: step2.title,
      courseCategory: step3.category,
      creatorTimeAvailablePerWeek: step4.timeAvailablePerWeek,
    };

    try {
      await createCourseDraft({ newCourseDraftEntry: newEntry }).unwrap();
      navigage('/instructor');
    } catch (error) {
      if (!isObjectWithData(error)) return;
      if (!isDataWithMessage(error.data)) return;
      dispatch(notified({ message: error.data.message, severity: 'info' }));
    }
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
