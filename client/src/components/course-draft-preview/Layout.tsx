import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import { Lesson } from '../../features/courseDraftsSlice';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useCourseDraft } from '../../hooks/useCourseDraft';
import { getSortedByOrderIndexCopy } from '../drag-and-drop-v2/utils';
import { Overview } from './Overview';
import { LectureWithoutVideo } from './LectureWithoutVideo';
import { VideoPlayer } from './VideoPlayer';
import { VideoAreaLayout } from './VideoAreaLayout';
import { SidebarSection } from './SidebarSection';

export const Layout = () => {
  const courseDraft = useCourseDraft();
  const [currentLecture, setCurrentLecture] = useState<Lesson | null>(null);

  const curriculum = courseDraft
    ? getSortedByOrderIndexCopy(courseDraft.courseContent.curriculum)
    : [];

  useEffect(() => {
    if (!courseDraft) return;

    const curriculum = getSortedByOrderIndexCopy(
      courseDraft.courseContent.curriculum
    );
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
