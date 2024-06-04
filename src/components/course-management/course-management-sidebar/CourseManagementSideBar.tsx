import { Stack } from '@mui/material';
import { Heading } from './Heading';
import { IntendedLearnersItem } from './sidebar-items/IntendedLearnersItem';
import { CourseStrucureItem } from './sidebar-items/CourseStructureItem';
import { isIntendedLearnersSectionReadyForSubmission } from '../../../features/courseDraftsSlice';
import { useCourseDraft } from '../../../hooks/useCourseDraft';
import { FilmAndEditItem } from './sidebar-items/FilmAndEditItem';
import { CurriculumItem } from './sidebar-items/CurriculumItem';

export const basePath = '/instructor/course';

export const CourseManagementSideBar = () => {
  const courseContent = useCourseDraft()?.courseContent;

  const isIntendedLearnersReadyForSubmission = courseContent
    ? isIntendedLearnersSectionReadyForSubmission(
        courseContent.learningObjectives.items,
        courseContent.prerequisites.items,
        courseContent.intendedLearners.items
      )
    : false;

  return (
    <Stack
      sx={{
        flexDirection: 'column',
        pt: 5,
      }}
    >
      <Stack
        sx={{
          flexDirection: 'column',
          gap: 4,
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
        <Stack
          sx={{
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Heading text="Create your content" />
          <Stack
            sx={{
              gap: 0,
            }}
          >
            <FilmAndEditItem />
            <CurriculumItem />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
