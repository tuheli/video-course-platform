import { Box, Typography } from '@mui/material';
import { VideoAreaLayout } from './VideoAreaLayout';

export const LectureWithoutVideo = () => {
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
        <Typography>This lecture does not have a video.</Typography>
      </Box>
    </VideoAreaLayout>
  );
};
