import { Container, Stack, Typography } from '@mui/material';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { Step1Item } from './Step1Item';
import { step1Updated } from '../../../../features/courseCreationSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';

export const Step1 = () => {
  const step1State = useAppSelector(
    (state) => state.courseCreation.steps.step1
  );
  const dispatch = useAppDispatch();

  const onClickCourse = () => {
    dispatch(step1Updated('course'));
  };

  const onClickPracticeTest = () => {
    dispatch(step1Updated('practice-test'));
  };

  return (
    <Container>
      <Stack
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Typography variant="h4">Step 1</Typography>
        <Typography variant="h4">
          First, let's find out what type of course you're making.
        </Typography>
        <Stack
          sx={{
            flexDirection: 'row',
            gap: 4,
          }}
        >
          <Step1Item
            heading="Course"
            description="Create rich learning experiences with the help of video lectures, quizzes, coding exercises, etc."
            Icon={OndemandVideoIcon}
            isSelected={step1State.courseType === 'course'}
            onClick={onClickCourse}
          />
          <Step1Item
            heading="Practice Test"
            description="Help students prepare for certification examps by providing practice question."
            Icon={OndemandVideoIcon}
            isSelected={step1State.courseType === 'practice-test'}
            onClick={onClickPracticeTest}
          />
        </Stack>
      </Stack>
    </Container>
  );
};
