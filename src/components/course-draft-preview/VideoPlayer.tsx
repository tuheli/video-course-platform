import { useEffect, useRef } from 'react';
import { VideoAreaLayout } from './VideoAreaLayout';

interface VideoPlayerProps {
  videoUrl: string;
}

export const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.load();
  }, [videoUrl]);

  return (
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
  );
};
