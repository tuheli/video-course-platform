import { Box } from '@mui/material';
import { CourseCreationAppBar } from './CourseCreationAppBar';
import { StepSelector } from './course-creation-flow/StepSelector';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { StepChangeButtonSelector } from './course-creation-flow/change-step-buttons/StepChangeButtonSelector';

export const CourseCreationPage = () => {
  useScrollToTop();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <CourseCreationAppBar />
        <Box
          sx={{
            py: 8,
          }}
        >
          <StepSelector />
        </Box>
        <Box
          sx={{
            marginTop: 'auto',
          }}
        >
          <StepChangeButtonSelector />
        </Box>
      </Box>
    </>
  );
};
