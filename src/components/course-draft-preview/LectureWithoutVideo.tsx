import { Box, Typography } from '@mui/material';
import { Lesson } from '../../features/courseDraftsSlice';
import { VideoAreaLayout } from './VideoAreaLayout';

interface LectureWithoutVideoProps {
  lecture: Lesson;
}

export const LectureWithoutVideo = ({ lecture }: LectureWithoutVideoProps) => {
  return (
    <VideoAreaLayout>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h5">{lecture.name}</Typography>
        <Typography>This lecture does not have a video.</Typography>
      </Box>
    </VideoAreaLayout>
  );
};
