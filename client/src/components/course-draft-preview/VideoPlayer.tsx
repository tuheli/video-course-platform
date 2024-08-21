import { useEffect, useRef } from 'react';
import { VideoAreaLayout } from './VideoAreaLayout';
import { useGetVideoUrlQuery } from '../../features/apiSlice';

interface VideoPlayerProps {
  coursedraftId: number;
  sectionId: number;
  lectureId: number;
  clearVideoPreviewState: () => void;
}

export const VideoPlayer = ({
  coursedraftId,
  sectionId,
  lectureId,
  clearVideoPreviewState,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { data, isError } = useGetVideoUrlQuery({
    coursedraftId,
    sectionId,
    lectureId,
  });
  const videoUrl = data && !isError ? data.presignedUrl : '';
  const isVideoVisible = Boolean(videoUrl);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.load();
  }, [videoUrl, isError]);

  useEffect(() => {
    if (!isError) return;
    clearVideoPreviewState();
  }, [isError]);

  return (
    <VideoAreaLayout>
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
    </VideoAreaLayout>
  );
};
