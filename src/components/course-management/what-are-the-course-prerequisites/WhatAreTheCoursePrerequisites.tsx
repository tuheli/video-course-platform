import { Stack, Typography } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { useParams } from 'react-router-dom';
import { EditPrerequisitesItem } from './EditPrerequisitesItem';
import { AddPrerequisiteButton } from './AddPrerequisiteButton';

export const WhatAreTheCoursePrerequisites = () => {
  const myEmail = useAppSelector((state) => state.me.user?.credentials.email);

  const { courseId } = useParams();

  const prerequisites = useAppSelector((state) => state.courseDrafts).find(
    ({ creatorEmail, id }) => courseId === id && creatorEmail === myEmail
  )?.courseContent.prerequisites;

  if (!courseId || !prerequisites) return null;

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
          courseDraftId={courseId}
        />
      ))}
      <AddPrerequisiteButton />
    </Stack>
  );
};
