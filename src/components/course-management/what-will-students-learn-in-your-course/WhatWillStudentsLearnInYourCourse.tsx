import { Stack, Typography } from '@mui/material';
import { LightColoredRouterLink } from '../LightColoredRouterLink';
import { useAppSelector } from '../../../app/hooks';
import { useParams } from 'react-router-dom';
import { EditLearningObjectiveItem } from './EditLearningObjectiveItem';
import { AddLearningObjectiveButton } from './AddLearningObjectiveButton';

export const WhatWillStudentsLearnInYourCourse = () => {
  const myEmail = useAppSelector((state) => state.me.user?.credentials.email);

  const { courseId } = useParams();

  const learningObjectives = useAppSelector((state) => state.courseDrafts).find(
    ({ creatorEmail, id }) => courseId === id && creatorEmail === myEmail
  )?.courseContent.learningObjectives;

  if (!courseId || !learningObjectives) return null;

  return (
    <Stack
      sx={{
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
        }}
      >
        What will students learn in your course?
      </Typography>
      <Typography>
        You must enter at least 4{' '}
        <LightColoredRouterLink to="/">
          learning objectives or outcomes
        </LightColoredRouterLink>{' '}
        that learners can expect to achieve after completing your course.
      </Typography>
      {learningObjectives.map((learningObjective) => (
        <EditLearningObjectiveItem
          key={learningObjective.id}
          courseDraftId={courseId}
          learningObjective={learningObjective}
        />
      ))}
      <AddLearningObjectiveButton />
    </Stack>
  );
};
