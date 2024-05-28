import { Stack } from '@mui/material';
import { Heading } from './Heading';
import { IntendedLearnersItem } from './sidebar-items/IntendedLearnersItem';
import { CourseStrucureItem } from './sidebar-items/CourseStructureItem';
import { isIntendedLearnersSectionReadyForSubmission } from '../../../features/courseDraftsSlice';
import { useCourseDraft } from '../../../hooks/useCourseDraft';

export const basePath = '/instructor/course';

export const CourseManagementSideBar = () => {
  const courseContent = useCourseDraft()?.courseContent;

  const isIntendedLearnersReadyForSubmission = courseContent
    ? isIntendedLearnersSectionReadyForSubmission(
        courseContent.intendedLearnersSection
      )
    : false;

  return (
    <Stack
      sx={{
        flexDirection: 'column',
        pt: 5,
        width: 280,
        height: 600,
      }}
    >
      <Stack
        sx={{
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Stack
          sx={{
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Heading text="Plan your course" />
          <Stack
            sx={{
              gap: 0,
            }}
          >
            <IntendedLearnersItem
              isReadyForSubmission={isIntendedLearnersReadyForSubmission}
            />
            <CourseStrucureItem />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
