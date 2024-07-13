import { useEffect, useRef } from 'react';
import { VideoAreaLayout } from '../course-draft-preview/VideoAreaLayout';
import { Divider, Stack, Typography } from '@mui/material';
import { useGetTopSecretDemovideoQuery } from '../../features/apiSlice';

export const TopSecretDemovideoPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { data } = useGetTopSecretDemovideoQuery();
  const videoUrl = data ? data.presignedUrl : '';

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.load();
  }, [data]);

  console.log('TopSecretDemovideoPage rendered', videoUrl);

  return (
    <>
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          py: 4,
        }}
      >
        <Typography>"This is a top secret demovideo.</Typography>
        <Typography>You are not allowed to watch this video."</Typography>
        <Typography>- GitHub Copilot</Typography>
        <Divider
          sx={{ width: '100%', borderColor: 'pink', pb: 2, maxWidth: 300 }}
        />
      </Stack>
      <div>
        <VideoAreaLayout>
          <video
            ref={videoRef}
            controls
            controlsList="nodownload"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'currentcolor',
            }}
          >
            <source src={videoUrl} />
          </video>
        </VideoAreaLayout>
      </div>
    </>
  );
};
