import {
  AppBar,
  LinearProgress,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { CompanyLogo } from '../appbar/CompanyLogo';
import { useAppSelector } from '../../app/hooks';
import { ExitButton } from './course-creation-flow/ExitButton';

const itemGap = 2;

export const CourseCreationAppBar = () => {
  const courseCreation = useAppSelector((state) => state.courseCreation);

  const progressValue =
    (courseCreation.currentStep / courseCreation.totalSteps) * 100;

  return (
    <AppBar
      sx={{
        position: 'static',
      }}
    >
      <Toolbar
        sx={{
          boxShadow: 0,
          zIndex: 1,
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: itemGap,
            }}
          >
            <CompanyLogo />
            <Typography
              sx={{
                color: 'text.primary',
              }}
            >
              Step {courseCreation.currentStep} of {courseCreation.totalSteps}
            </Typography>
          </Stack>
          <ExitButton />
        </Stack>
      </Toolbar>
      <LinearProgress
        variant="determinate"
        value={progressValue}
        sx={{
          height: 8,
        }}
      />
    </AppBar>
  );
};
