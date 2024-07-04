import { useEffect, useRef, useState } from 'react';
import { VideoAreaLayout } from './VideoAreaLayout';
import { Lesson } from '../../features/courseDraftsSlice';
import { useCreateLessonVideostreamTokenMutation } from '../../features/apiSlice';

interface VideoPlayerProps {
  currentLecture: Lesson;
}

export const VideoPlayer = ({ currentLecture }: VideoPlayerProps) => {
  const [src, setSrc] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [createToken] = useCreateLessonVideostreamTokenMutation();

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.load();
  }, [currentLecture, src]);

  useEffect(() => {
    if (!videoRef.current) return;

    const getVideoStreamToken = async () => {
      try {
        const response = await createToken({ lectureId: currentLecture.id });

        if (response.data) {
          const token = response.data.token;
          setSrc(
            `http://localhost:3000/api/coursedrafts/videostream/${currentLecture.id}?token=${token}`
          );
        }
      } catch (error) {
        throw error;
      }
    };

    try {
      getVideoStreamToken();
    } catch (error) {
      console.log(error);
    }
  }, [currentLecture]);

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
        <source src={src} />
      </video>
    </VideoAreaLayout>
  );
};
