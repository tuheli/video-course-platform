import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useCourseDraft } from '../../hooks/useCourseDraft';
import { Overview } from './Overview';
import { VideoPlayer } from './VideoPlayer';
import { SidebarSection } from './SidebarSection';
import { LectureWithoutVideo } from './LectureWithoutVideo';
import { ICurriculumSection } from '../../features/courseDraftsSlice';

export interface VideoPreviewSelection {
  coursedraftId: number;
  sectionId: number;
  lectureId: number;
}

export const Layout = () => {
  const [selectedState, setSelectedState] =
    useState<VideoPreviewSelection | null>(null);
  const courseDraft = useCourseDraft();

  const curriculum = !courseDraft
    ? []
    : [...courseDraft.courseContent.curriculum].sort(
        (a, b) => a.orderIndex - b.orderIndex
      );

  const curriculumWithSortedLessons = curriculum.map((section) => {
    const sortedLessons = [...section.lessons].sort(
      (a, b) => a.orderIndex - b.orderIndex
    );
    const sectionToReturn: ICurriculumSection = {
      ...section,
      lessons: sortedLessons,
    };
    return sectionToReturn;
  });

  const onClickSidebarLecture = (state: VideoPreviewSelection) => {
    setSelectedState(state);
  };

  const clearVideoPreviewState = () => {
    setSelectedState(null);
  };

  useEffect(() => {
    const isCourseDraftValid = courseDraft !== undefined;
    if (!isCourseDraftValid) return;

    const isAnySectionsInCurriculum = curriculumWithSortedLessons.length > 0;
    if (!isAnySectionsInCurriculum) return;

    const firstSection = curriculumWithSortedLessons[0];
    const isAnyLecturesInSection = firstSection.lessons.length > 0;
    if (!isAnyLecturesInSection) return;

    const initialLesson = firstSection.lessons[0];
    const initialSelection: VideoPreviewSelection = {
      coursedraftId: courseDraft.id,
      sectionId: firstSection.id,
      lectureId: initialLesson.id,
    };

    setSelectedState(initialSelection);
  }, []);

  if (!courseDraft) return null;
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
            {selectedState ? (
              <VideoPlayer
                {...selectedState}
                clearVideoPreviewState={clearVideoPreviewState}
              />
            ) : (
              <LectureWithoutVideo />
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
            {curriculumWithSortedLessons.map((section, index) => {
              return (
                <Box key={section.id}>
                  <SidebarSection
                    coursedraftId={courseDraft.id}
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
