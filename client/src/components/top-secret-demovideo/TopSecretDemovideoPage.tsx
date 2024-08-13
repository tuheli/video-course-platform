import { useEffect, useRef } from 'react';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { useGetTopSecretDemovideoQuery } from '../../features/apiSlice';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { useNavigate } from 'react-router-dom';

export const TopSecretDemovideoPage = () => {
  useScrollToTop();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { data } = useGetTopSecretDemovideoQuery();
  const navigate = useNavigate();
  const videoUrl = data ? data.presignedUrl : '';

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.load();
  }, [data]);

  const onClickBackButton = () => {
    navigate('/');
  };

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
        <Button
          onClick={onClickBackButton}
          variant="contained"
          sx={{
            width: 90,
            height: 36,
            my: 2,
          }}
        >
          Back
        </Button>
        <Divider
          sx={{ width: '100%', borderColor: 'pink', pb: 0, maxWidth: 300 }}
        />
      </Stack>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: 32,
        }}
      >
        <video
          ref={videoRef}
          controls
          controlsList="nodownload"
          style={{
            backgroundColor: 'currentcolor',
            width: '100%',
          }}
        >
          <source src={videoUrl} />
        </video>
      </div>
    </>
  );
};
