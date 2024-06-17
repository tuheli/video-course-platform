import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { LightColoredRouterLink } from '../../manage-course-goals-page/LightColoredRouterLink';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { SelectVideo } from './SelectVideo';

type ContentType = 'video';

interface SelectContentTypeProps {
  courseDraftId: number;
  sectionId: string;
  lectureId: string;
}

export const SelectContentType = (props: SelectContentTypeProps) => {
  const [activeContentType, setActiveContentType] =
    useState<ContentType | null>(null);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const onMouseEnter = () => {
    setIsMouseOver(true);
  };

  const onMouseLeave = () => {
    setIsMouseOver(false);
  };

  const onClickVideo = () => {
    setActiveContentType('video');
  };

  return (
    <>
      {activeContentType === null ? (
        <Stack
          sx={{
            bgcolor: 'background.default',
            border: '1px solid',
            borderColor: 'text.primary',
            borderTop: 'none',
            p: 1,
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography>
            Select the main type of content. Files and links can be added as
            resources.{' '}
            <LightColoredRouterLink to="/">
              Learn about content types.
            </LightColoredRouterLink>
          </Typography>
          <Stack
            sx={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            <Stack
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onClick={onClickVideo}
              sx={{
                bgcolor: isMouseOver ? 'grey.800' : 'grey.400',
                alignItems: 'center',
                p: 0.25,
                gap: 0.5,
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 40,
                  bgcolor: isMouseOver ? 'grey.800' : 'background.default',
                }}
              >
                <PlayArrowIcon
                  sx={{
                    borderRadius: '50%',
                    bgcolor: isMouseOver ? 'background.default' : 'grey.400',
                    color: isMouseOver ? 'grey.800' : 'background.default',
                    fontSize: 30,
                  }}
                />
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: isMouseOver ? 'background.default' : 'text.primary',
                }}
              >
                Video
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Box onMouseDown={(event) => event.stopPropagation()}>
          {activeContentType === 'video' && <SelectVideo {...props} />}
        </Box>
      )}
    </>
  );
};
