import { Stack, Typography } from '@mui/material';
import { LightColoredRouterLink } from '../LightColoredRouterLink';
import { EditLearningObjectiveItem } from './EditLearningObjectiveItem';
import { AddLearningObjectiveButton } from './AddLearningObjectiveButton';
import { useCourseDraft } from '../../../hooks/useCourseDraft';

export const WhatWillStudentsLearnInYourCourse = () => {
  const courseDraft = useCourseDraft();

  const learningObjectives =
    courseDraft?.courseContent.intendedLearnersSection.learningObjectives;

  const courseDraftId = courseDraft?.id;

  if (!courseDraftId || !learningObjectives) return null;

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
          courseDraftId={courseDraftId}
          learningObjective={learningObjective}
        />
      ))}
      <AddLearningObjectiveButton />
    </Stack>
  );
};
