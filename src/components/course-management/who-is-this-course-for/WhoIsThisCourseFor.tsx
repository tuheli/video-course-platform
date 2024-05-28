import { Stack, Typography } from '@mui/material';
import { LightColoredRouterLink } from '../LightColoredRouterLink';
import { useAppSelector } from '../../../app/hooks';
import { useParams } from 'react-router-dom';
import { EditIntendedLearnersItem } from './EditIntendedLearnersItem';
import { AddIntendedLearnersButton } from './AddIntendedLearnersButton';

export const WhoIsThisCourseFor = () => {
  const myEmail = useAppSelector((state) => state.me.user?.credentials.email);

  const { courseId } = useParams();

  const intendedLearners = useAppSelector((state) => state.courseDrafts).find(
    ({ creatorEmail, id }) => courseId === id && creatorEmail === myEmail
  )?.courseContent.intendedLearners;

  if (!courseId || !intendedLearners) return null;

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
        Who is this course for?
      </Typography>
      <Typography>
        Write a clear description of the{' '}
        <LightColoredRouterLink to="/">
          intended learneres
        </LightColoredRouterLink>{' '}
        for your course who will find your course content valuable. This will
        help you attract the right learners to your course.
      </Typography>
      {intendedLearners.map((item) => (
        <EditIntendedLearnersItem
          key={item.id}
          courseDraftId={courseId}
          intendedLearners={item}
        />
      ))}
      <AddIntendedLearnersButton />
    </Stack>
  );
};
