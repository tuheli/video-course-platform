import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useAppSelector } from '../../app/hooks';
import { LineClampedTypography } from '../broad-courses-selection/LineClampedTypography';
import SettingsIcon from '@mui/icons-material/Settings';

const itemGap = 2;

const formatVideoContentUploadedDuration = (durationSeconds: number) => {
  const date = new Date(0);
  date.setSeconds(durationSeconds);

  const isoString = date.toISOString();

  // Cast to num to remove trailing zeroes
  const hours = Number(isoString.substring(11, 13));
  const minutes = Number(isoString.substring(14, 16));
  const seconds = Number(isoString.substring(17, 19));

  const suffix = 'of video content uploaded';

  if (hours === 0 && minutes === 0) {
    return `0min ${suffix}`;
  }

  if (hours === 0) {
    return `${minutes}m ${seconds}s ${suffix}`;
  }

  return `${hours}h ${minutes}m ${seconds}s ${suffix}`;
};

export const CourseManagementAppBar = () => {
  const { courseId } = useParams();

  const course = useAppSelector((state) => state.courseDrafts).find(
    ({ id }) => id === courseId
  );

  const courseContent = course?.courseContent;

  const videoContentUploadedText = courseContent
    ? formatVideoContentUploadedDuration(
        courseContent.videoContentLengthSeconds
      )
    : '0min';

  return (
    <AppBar
      sx={{
        position: 'fixed',
      }}
    >
      <Stack
        sx={{
          flexDirection: 'column',
        }}
      >
        <Toolbar
          sx={{
            bgcolor: 'background.dark',
            zIndex: 1,
          }}
        >
          <Stack
            sx={{
              flexGrow: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: itemGap,
            }}
          >
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: itemGap,
              }}
            >
              <Link
                to="/instructor/courses"
                style={{
                  display: 'flex',
                  textDecoration: 'none',
                  color: 'inherit',
                  alignItems: 'center',
                }}
              >
                <KeyboardArrowLeftIcon />
                <Typography
                  sx={{
                    color: 'text.contrast',
                  }}
                >
                  Back to courses
                </Typography>
              </Link>
              <Box
                sx={{
                  maxWidth: 240,
                }}
              >
                <LineClampedTypography maxLines={1}>
                  {course?.courseTitle}
                </LineClampedTypography>
              </Box>
              <Box
                sx={{
                  bgcolor: 'text.secondary',
                  p: 0.8,
                  textAlign: 'center',
                  display: 'flex',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    lineHeight: 1,
                  }}
                >
                  DRAFT
                </Typography>
              </Box>
              <Typography>{videoContentUploadedText}</Typography>
            </Stack>
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: itemGap,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  minWidth: 80,
                }}
              >
                Save
              </Button>
              <Link
                to=""
                style={{
                  color: 'inherit',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                  }}
                >
                  <SettingsIcon
                    sx={{
                      color: 'text.contrast',
                    }}
                  />
                </Box>
              </Link>
            </Stack>
          </Stack>
        </Toolbar>
      </Stack>
    </AppBar>
  );
};
