import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import {
  CourseDraft,
  ICurriculumSection,
  Lesson,
} from '../../features/courseDraftsSlice';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { BottomExtensionOpener } from '../curriculum/lecture/BottomExtensionOpener';
import SearchIcon from '@mui/icons-material/Search';
import { Star } from '../broad-courses-selection/Star';
import { useCourseDraft } from '../../hooks/useCourseDraft';
import { getSortedCopy } from '../drag-and-drop-v2/utils';
import { formatDate, formatValue } from '../../utils/formatters';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

export const Layout = () => {
  const courseDraft = useCourseDraft();
  const [currentLecture, setCurrentLecture] = useState<Lesson | null>(null);

  const curriculum = courseDraft
    ? getSortedCopy(courseDraft.courseContent.curriculum)
    : [];

  useEffect(() => {
    if (!courseDraft) return;

    const curriculum = getSortedCopy(courseDraft.courseContent.curriculum);
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
            width: '78%',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              borderBottom: '1px solid',
              borderColor: 'grey.400',
              bgcolor: 'background.default',
            }}
          >
            {currentLecture && currentLecture.video ? (
              <VideoPlayer videoUrl={currentLecture.video.url} />
            ) : currentLecture ? (
              <LectureWithoutVideo lecture={currentLecture} />
            ) : (
              <VideoAreaLayout />
            )}
          </Box>
          <Stack
            sx={{
              mt: 1,
              gap: 1,
            }}
          >
            <Stack
              sx={{
                flexDirection: 'row',
                gap: 2,
                px: 4,
                py: 1,
              }}
            >
              <Box
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <SearchIcon
                  sx={{
                    fontSize: 18,
                  }}
                />
              </Box>
              <Box
                sx={{
                  cursor: 'pointer',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Overview
                </Typography>
              </Box>
              <Box
                sx={{
                  cursor: 'pointer',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Notes
                </Typography>
              </Box>
              <Box
                sx={{
                  cursor: 'pointer',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Announcements
                </Typography>
              </Box>
            </Stack>
            <Divider
              sx={{
                borderColor: 'grey.400',
              }}
            />
            <Box
              sx={{
                mt: 2,
              }}
            >
              {courseDraft && <Overview courseDraft={courseDraft} />}
            </Box>
          </Stack>
        </Stack>
        <Box
          sx={{
            width: '22%',
            border: '1px solid',
            borderRight: 'none',
            borderTop: 'none',
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

interface OverviewProps {
  courseDraft: CourseDraft;
}

const Overview = ({ courseDraft }: OverviewProps) => {
  const ratings = courseDraft.ratings;
  const ratingCount = formatValue(ratings.length);
  const ratingSum = ratings.reduce((acc, { rating }) => acc + rating, 0);
  const ratingAverage =
    ratings.length > 0 ? (ratingSum / ratings.length).toFixed(1) : '0.0';
  const studentCount = formatValue(courseDraft.enrollments.length);
  const createdAt = formatDate(new Date(courseDraft.createdAt));

  return (
    <Stack
      sx={{
        gap: 1,
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          px: 4,
          gap: 4,
        }}
      >
        <Stack>
          <Stack
            sx={{
              flexDirection: 'row',
            }}
          >
            <Typography
              component={'div'}
              sx={{
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.5,
              }}
            >
              {ratingAverage}{' '}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Star fillAmount={1} iconSize={18} />
              </Box>
            </Typography>
          </Stack>
          <Stack
            sx={{
              flexDirection: 'row',
            }}
          >
            <Typography variant="caption">{ratingCount} ratings</Typography>
          </Stack>
        </Stack>
        <Stack>
          <Stack
            sx={{
              flexDirection: 'row',
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
              }}
            >
              {studentCount}
            </Typography>
          </Stack>
          <Stack
            sx={{
              flexDirection: 'row',
            }}
          >
            <Typography variant="caption">Students</Typography>
          </Stack>
        </Stack>
        {/** What total is this? */}
        {/* <Stack>
          <Stack
            sx={{
              flexDirection: 'row',
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
              }}
            >
              0
            </Typography>
          </Stack>
          <Stack
            sx={{
              flexDirection: 'row',
            }}
          >
            <Typography variant="caption">Total</Typography>
          </Stack>
        </Stack> */}
      </Stack>
      <Stack
        sx={{
          flexDirection: 'row',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        ></Box>
      </Stack>
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          px: 4,
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pb: 0.2,
          }}
        >
          <EditCalendarIcon
            sx={{
              fontSize: 18,
            }}
          />
        </Box>
        <Typography variant="body2">Draft created on {createdAt}</Typography>
      </Stack>
    </Stack>
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
