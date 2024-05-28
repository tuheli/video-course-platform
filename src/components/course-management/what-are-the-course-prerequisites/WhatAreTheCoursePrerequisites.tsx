import { Stack, Typography } from '@mui/material';
import { EditPrerequisitesItem } from './EditPrerequisitesItem';
import { AddPrerequisiteButton } from './AddPrerequisiteButton';
import { useCourseDraft } from '../../../hooks/useCourseDraft';

export const WhatAreTheCoursePrerequisites = () => {
  const courseDraft = useCourseDraft();

  const prerequisites =
    courseDraft?.courseContent.intendedLearnersSection.prerequisites;

  const courseDraftId = courseDraft?.id;

  if (!prerequisites || !courseDraftId) return null;

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
        What are the requirements or prerequisites for taking your course?
      </Typography>
      <Typography>
        List the required skills, experience, tools or equipment learners should
        have prior to taking your course. If there are no requirements, use this
        space as an opportunity to lower the barrier for beginners.
      </Typography>
      {prerequisites.map((prerequisite) => (
        <EditPrerequisitesItem
          key={prerequisite.id}
          prerequisite={prerequisite}
          courseDraft={courseDraft}
        />
      ))}
      <AddPrerequisiteButton />
    </Stack>
  );
};
