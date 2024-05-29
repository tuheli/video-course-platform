import { Stack, Typography } from '@mui/material';
import { LightColoredRouterLink } from '../LightColoredRouterLink';
import { EditIntendedLearnersItem } from './EditIntendedLearnersItem';
import { AddIntendedLearnersButton } from './AddIntendedLearnersButton';
import { useCourseDraft } from '../../../hooks/useCourseDraft';

export const WhoIsThisCourseFor = () => {
  const courseDraft = useCourseDraft();

  const intendedLearners = courseDraft?.courseContent.intendedLearners.items;

  const courseDraftId = courseDraft?.id;

  if (!courseDraftId || !intendedLearners) return null;

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
          courseDraft={courseDraft}
          intendedLearners={item}
        />
      ))}
      <AddIntendedLearnersButton />
    </Stack>
  );
};
