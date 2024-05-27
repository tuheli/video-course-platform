import { Box, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import {
  CourseDraft,
  getCourseDraftProgressValue,
} from '../../../features/courseDraftsSlice';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface CourseDraftItemProps {
  courseDraft: CourseDraft;
}

export const CourseDraftItem = ({ courseDraft }: CourseDraftItemProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const onMouseEnterLink = () => {
    setIsHovering(true);
  };

  const onMouseLeaveLink = () => {
    setIsHovering(false);
  };

  const linkTo = `/instructor/course/${courseDraft.id}/manage/goals`;
  const courseDraftProgressValue = getCourseDraftProgressValue(courseDraft);

  return (
    <Paper
      sx={{
        p: 0,
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          gap: 2,
          height: 140,
        }}
      >
        <Box
          component="img"
          src="/course-draft-images/course-draft-placeholder-image.jpg"
        />
        <Link
          onMouseEnter={onMouseEnterLink}
          onMouseLeave={onMouseLeaveLink}
          to={linkTo}
          style={{
            position: 'relative',
            display: 'flex',
            textDecoration: 'none',
            color: 'inherit',
            flexGrow: 1,
          }}
        >
          {isHovering && <OnHoverOverlay />}
          <Stack
            sx={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '30%',
              py: 2,
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
              }}
            >
              {courseDraft.courseTitle}
            </Typography>
            <Stack
              sx={{
                flexDirection: 'row',
                gap: 1,
              }}
            >
              {!courseDraft.isSubmissionProcessCompleted && (
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  DRAFT
                </Typography>
              )}
              <Typography component="span" variant="caption" sx={{}}>
                {courseDraft.isPublic && 'Public'}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            sx={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              gap: 2,
              pr: 2,
            }}
          >
            <Typography>Finish your course</Typography>
            <Box
              sx={{
                display: 'flex',
                flexGrow: 1,
                height: 10,
              }}
            >
              <LinearProgress
                variant="determinate"
                value={courseDraftProgressValue}
              />
            </Box>
          </Stack>
        </Link>
      </Stack>
    </Paper>
  );
};

const OnHoverOverlay = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        display: 'flex',
        zIndex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        bgcolor: 'rgba(255, 255, 255, 0.85)',
      }}
    >
      <Typography
        sx={{
          color: 'secondary.dark',
          fontSize: 22,
          fontWeight: 600,
        }}
      >
        Edit / manage course
      </Typography>
    </Box>
  );
};
