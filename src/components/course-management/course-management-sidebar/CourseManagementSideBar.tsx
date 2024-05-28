import { Stack } from '@mui/material';
import { Heading } from './Heading';
import { IntendedLearnersItem } from './sidebar-items/IntendedLearnersItem';
import { CourseStrucureItem } from './sidebar-items/CourseStructureItem';

export const basePath = '/instructor/course';

export const CourseManagementSideBar = () => {
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
            <IntendedLearnersItem />
            <CourseStrucureItem />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
