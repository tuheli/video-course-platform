import { useEffect, useRef } from 'react';
import { VideoAreaLayout } from './VideoAreaLayout';
import { useGetVideoUrlQuery } from '../../features/apiSlice';

interface VideoPlayerProps {
  coursedraftId: number;
  sectionId: number;
  lectureId: number;
}

export const VideoPlayer = ({
  coursedraftId,
  sectionId,
  lectureId,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { data, isError } = useGetVideoUrlQuery({
    coursedraftId,
    sectionId,
    lectureId,
  });
  const videoUrl = data && !isError ? data.presignedUrl : '';

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.load();
  }, [videoUrl, isError]);

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
