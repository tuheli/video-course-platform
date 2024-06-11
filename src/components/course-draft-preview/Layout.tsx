import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import { useCurriculumFromParams } from '../../hooks/useCurriculum';
import { ICurriculumSection, Lesson } from '../../features/courseDraftsSlice';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { BottomExtensionOpener } from '../curriculum/lecture/BottomExtensionOpener';

export const Layout = () => {
  const { curriculum } = useCurriculumFromParams();
  const [currentLecture, setCurrentLecture] = useState<Lesson | null>(null);

  useEffect(() => {
    if (curriculum.length === 0) return;
    const firstLecture = curriculum[0].lessons[0];
    setCurrentLecture(firstLecture);
  }, []);

  const onClickSidebarLecture = (lecture: Lesson) => {
    setCurrentLecture(lecture);
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Stack
        sx={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Stack
          sx={{
            bgcolor: 'background.default',
            width: '78%',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {currentLecture && currentLecture.video ? (
            <VideoPlayer videoUrl={currentLecture.video.url} />
          ) : currentLecture ? (
            <LectureWithoutVideo lecture={currentLecture} />
          ) : (
            <VideoAreaLayout />
          )}
        </Stack>
        <Box
          sx={{
            width: '22%',
            border: '1px solid',
            borderColor: 'grey.400',
          }}
        >
          <Stack>
            <Typography
              sx={{
                p: 2,
                fontWeight: 500,
              }}
            >
              Course content
            </Typography>
            <Divider
              sx={{
                borderColor: 'grey.400',
              }}
            />
            {curriculum.map((section, index) => {
              return (
                <Box key={section.id}>
                  <SidebarSection
                    section={section}
                    index={index}
                    onClickLecture={onClickSidebarLecture}
                  />
                  <Divider
                    sx={{
                      borderColor: 'grey.400',
                    }}
                  />
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

interface LectureWithoutVideoProps {
  lecture: Lesson;
}

const LectureWithoutVideo = ({ lecture }: LectureWithoutVideoProps) => {
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
        }}
      >
        <Typography>{lecture.name}</Typography>
      </Box>
    </VideoAreaLayout>
  );
};

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
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

interface VideoAreaLayoutProps {
  children?: ReactNode;
}

const VideoAreaLayout = ({ children }: VideoAreaLayoutProps) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 0,
        paddingBottom: '56.25%',
      }}
    >
      {children}
    </div>
  );
};

interface SidebarSectionProps {
  section: ICurriculumSection;
  index: number;
  onClickLecture: (lecture: Lesson) => void;
}

const SidebarSection = ({
  section,
  index,
  onClickLecture,
}: SidebarSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const onClick = () => {
    setIsExpanded((previousValue) => !previousValue);
  };

  return (
    <Stack>
      <Stack
        onClick={onClick}
        sx={{
          bgcolor: 'background.paper',
          p: 2,
          cursor: 'pointer',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
            }}
          >
            Section {index + 1}: {section.title}
          </Typography>
          <Box onClick={(event) => event.stopPropagation()}>
            <BottomExtensionOpener isOpen={isExpanded} setIsOpen={onClick} />
          </Box>
        </Box>
        <Typography variant="caption">
          {0} / {section.lessons.length} | {0}min
        </Typography>
      </Stack>
      {isExpanded && section.lessons.length > 0 ? (
        <Stack
          sx={{
            bgcolor: 'background.paper',
          }}
        >
          {section.lessons.map((lesson, index) => {
            return (
              <Box
                key={lesson.id}
                onClick={() => onClickLecture(lesson)}
                sx={{
                  px: 2,
                  py: 0.5,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'background.paperDarker',
                  },
                }}
              >
                <Typography variant="caption">
                  {index + 1}. {lesson.name}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      ) : (
        isExpanded && (
          <Box
            sx={{
              bgcolor: 'background.paper',
              px: 2,
            }}
          >
            <Typography variant="caption">
              This section has no lessons.
            </Typography>
          </Box>
        )
      )}
    </Stack>
  );
};
