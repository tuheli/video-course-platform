import { useEffect, useRef } from 'react';
import { useGetTopSecretDemovideoQuery } from '../../features/apiSlice';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Divider, Stack, Typography } from '@mui/material';

export const TopSecretDemovideoPage = () => {
  useScrollToTop();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { data } = useGetTopSecretDemovideoQuery();
  const location = useLocation();
  const navigate = useNavigate();
  const videoUrl = data ? data.presignedUrl : '';
  const isVideoVisible = Boolean(videoUrl);

  const onClickBackButton = () => {
    const isPathHistoryEmpty = location.key === 'default';
    if (isPathHistoryEmpty) navigate('/');
    else navigate(-1);
  };

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.load();
  }, [data]);

  return (
    <>
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
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
          position: 'relative',
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '80%',
            height: '80%',
          }}
        >
          {isVideoVisible && (
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
          )}
        </div>
      </div>
    </>
  );
};
