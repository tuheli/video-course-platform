import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Box, Divider, Stack, Typography, styled } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { updatedVideo } from '../../../features/courseDraftsSlice';
import { getAudioDuration } from '../utils';

const StyledLabel = styled('label')({});

interface SelectVideoProps {
  courseDraftId: number;
  sectionId: number;
  lectureId: number;
}

// NOTE: Mock timer to change upload status.
const mockUploadDelay = 2000;

export const SelectVideo = ({
  courseDraftId,
  sectionId,
  lectureId,
}: SelectVideoProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const uploadTimeoutRef = useRef<number | null>(null);
  const dispatch = useCallback(useAppDispatch(), []);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const onClickReplace = () => {
    setFile(null);
  };

  const finishUpload = async (file: File) => {
    const newVideoUrl = URL.createObjectURL(file);
    try {
      const duration = await getAudioDuration(file);

      dispatch(
        updatedVideo({
          courseDraftId,
          curriculumSectionId: sectionId,
          lectureId,
          url: newVideoUrl,
          lengthSeconds: duration,
        })
      );

      setIsUploadComplete(true);
    } catch (error) {
      // Ignore error
      // Maybe popup notification to user
      URL.revokeObjectURL(newVideoUrl);
    }
  };

  useEffect(() => {
    if (file === null) {
      setIsUploadComplete(false);
      return;
    }

    uploadTimeoutRef.current = setTimeout(() => {
      if (file === null) return;
      finishUpload(file);
    }, mockUploadDelay);

    return () => {
      // NOTE: Unmount just cancels the upload for now.
      // Maybe web workers for background upload.
      if (uploadTimeoutRef.current !== null) {
        clearTimeout(uploadTimeoutRef.current);
        uploadTimeoutRef.current = null;
      }
    };
  }, [file]);

  return (
    <>
      {file === null ? (
        <Stack
          sx={{
            flexDirection: 'column',
            bgcolor: 'background.default',
            border: '1px solid',
            borderColor: 'text.primary',
            borderTop: 'none',
            p: 1,
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
            }}
          >
            Upload video
          </Typography>
          <div>
            <input
              type="file"
              accept="video/*"
              onChange={onFileChange}
              style={{ display: 'none' }}
              id="fileInput"
            />
            <StyledLabel
              htmlFor="fileInput"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: 'text.primary',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                userSelect: 'none',
                width: '100%',
              }}
            >
              <Typography
                sx={{
                  bgcolor: 'background.paperDarker',
                  color: 'text.primary',
                  border: '1px solid',
                  borderColor: 'text.primary',
                  p: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%',
                }}
              >
                No file selected
              </Typography>
              <Box
                sx={{
                  width: '18%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid',
                  borderLeft: 'none',
                  borderColor: 'text.primary',
                  p: 1,
                  cursor: 'pointer',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Select Video
                </Typography>
              </Box>
            </StyledLabel>
          </div>
          <Stack
            sx={{
              flexDirection: 'row',
              gap: 0.5,
            }}
          >
            <Typography
              component="span"
              variant="caption"
              sx={{
                fontWeight: 600,
                color: 'text.secondary',
              }}
            >
              Note:
            </Typography>
            <Typography
              component="span"
              variant="caption"
              sx={{
                color: 'text.secondary',
              }}
            >
              All files should be at least 720p and less than 4.0 GB.
            </Typography>
          </Stack>
        </Stack>
      ) : (
        <>
          <Stack
            sx={{
              bgcolor: 'background.default',
              border: '1px solid',
              borderColor: 'text.primary',
              borderTop: 'none',
              p: 1,
              gap: 1,
            }}
          >
            <Stack
              sx={{
                flexDirection: 'row',
              }}
            >
              <Box
                sx={{
                  width: '25%',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Filename
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '25%',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Type
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '25%',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Status
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '25%',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Date
                </Typography>
              </Box>
            </Stack>
            <Divider
              sx={{
                borderColor: 'grey.300',
              }}
            />
            <Stack
              sx={{
                flexDirection: 'row',
              }}
            >
              <Box
                sx={{
                  width: '25%',
                }}
              >
                <Typography
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {file?.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '25%',
                }}
              >
                <Typography>{file?.type}</Typography>
              </Box>
              <Box
                sx={{
                  width: '25%',
                }}
              >
                <Typography>
                  {isUploadComplete ? 'Uploaded' : 'Processing'}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '25%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography>{new Date().toLocaleDateString()}</Typography>
                <Typography
                  onClick={onClickReplace}
                  sx={{
                    color: 'secondary.light',
                    cursor: 'pointer',
                  }}
                >
                  Replace
                </Typography>
              </Box>
            </Stack>
            <Divider
              sx={{
                borderColor: 'grey.300',
              }}
            />
            <Stack
              sx={{
                flexDirection: 'row',
                gap: 0.5,
              }}
            >
              {isUploadComplete ? (
                <>
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    Note:
                  </Typography>
                  <Typography component="span" variant="caption">
                    Video has been uploaded successfully.
                  </Typography>
                </>
              ) : (
                <>
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    Note:
                  </Typography>
                  <Typography component="span" variant="caption">
                    This video is still being processed. We will send you an
                    email when it is ready.
                  </Typography>
                </>
              )}
            </Stack>
          </Stack>
        </>
      )}
    </>
  );
};
