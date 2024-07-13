import { ChangeEvent, useState } from 'react';
import { Box, Divider, Stack, Typography, styled } from '@mui/material';
import { useChunkUpload } from '../../../hooks/useChunkUpload';
import { useAppDispatch } from '../../../app/hooks';
import { notified } from '../../../features/notificationSlice';

const StyledLabel = styled('label')({});

interface SelectVideoProps {
  courseDraftId: number;
  sectionId: number;
  lectureId: number;
}

export const SelectVideo = ({
  courseDraftId,
  sectionId,
  lectureId,
}: SelectVideoProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isReplacingFile, setIsReplacingFile] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);
  const [totalChunkCount, setTotalChunkCount] = useState(0);
  const [uploadedChunkCount, setUploadedChunkCount] = useState(0);
  const { upload } = useChunkUpload();
  const dispatch = useAppDispatch();

  const isSuccessDataVisible = isUploadSuccessful && !isReplacingFile;
  const isProcessingDataVisible =
    !isSuccessDataVisible && isUploadingFile && !isReplacingFile;
  const isAnyDisplayDataVisible =
    isSuccessDataVisible || isProcessingDataVisible;

  const fileName = file?.name;
  const type = file?.type;
  const dateNow = new Date().toLocaleDateString();

  const successDisplayData = {
    fileName,
    type,
    status: 'Uploaded',
    date: dateNow,
  };

  const processingDisplayData = {
    fileName,
    type,
    status: 'Processing',
    date: dateNow,
  };

  const displayData = isSuccessDataVisible
    ? successDisplayData
    : processingDisplayData;

  // NOTE: The upload does not stop when the
  // component is unmounted. Also upload abort
  // is not implemented.

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const onUploadFinished = () => {
      setIsUploadingFile(false);
      setIsUploadSuccessful(true);
      setTotalChunkCount(0);
      setUploadedChunkCount(0);
    };

    const onUploadStarted = (totalChunkCount: number) => {
      setIsUploadingFile(true);
      setTotalChunkCount(totalChunkCount);
      setUploadedChunkCount(0);
    };

    const onChunkUploaded = (uploadedChunkCount: number) => {
      setUploadedChunkCount(uploadedChunkCount);
    };

    if (event.target.files) {
      const file = event.target.files[0];
      setFile(file);
      setIsUploadSuccessful(false);
      setIsReplacingFile(false);
      console.log(
        '@selectvideo calling upload from select video because of file change'
      );
      try {
        await upload(
          file,
          courseDraftId,
          sectionId,
          lectureId,
          onUploadStarted,
          onUploadFinished,
          onChunkUploaded
        );
        console.log('@selectvideo upload was finished at select video');
      } catch (error) {
        setIsUploadingFile(false);
        setIsUploadSuccessful(false);
        setFile(null);
        dispatch(
          notified({
            message:
              'An error occurred while uploading video. Please try again later.',
            severity: 'error',
          })
        );
        console.log('@selectvideo error while uploading video');
      }
    }
  };

  const onClickReplace = () => {
    setFile(null);
    setIsReplacingFile(true);
  };

  return (
    <>
      {!isAnyDisplayDataVisible && (
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
      )}
      {isAnyDisplayDataVisible && (
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
                  {displayData?.fileName}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '25%',
                }}
              >
                <Typography>{displayData?.type}</Typography>
              </Box>
              <Box
                sx={{
                  width: '25%',
                }}
              >
                <Typography>{displayData.status}</Typography>
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
              {displayData.status === 'Uploaded' ? (
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
                    This video is still being processed. Uploaded{' '}
                    {uploadedChunkCount} of {totalChunkCount} chunks.
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
