import { ChangeEvent, memo, useState } from 'react';
import {
  deletedLecture,
  updatedLecture,
} from '../../../features/courseDraftsSlice';
import { useAppDispatch } from '../../../app/hooks';
import { LectureContext } from '../../../contexts/LectureContext';
import { Box, Divider, Stack, Typography, styled } from '@mui/material';
import { InputFieldWithMaxCharacters } from '../../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { SaveAndCancelButton } from '../SaveAndCancelButton';
import { BottomExtensionOpener } from './BottomExtensionOpener';
import { BottomExtension } from './BottomExtension';
import { Heading } from '../Heading';
import { LectureProps } from './types';
import { MemoDraghandle } from '../../drag-and-drop-v2/Draghandle';
import AddIcon from '@mui/icons-material/Add';
import { LightColoredRouterLink } from '../../manage-course-goals-page/LightColoredRouterLink';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RemoveIcon from '@mui/icons-material/Remove';

const Lecture = ({
  lecture,
  index,
  courseDraftId,
  sectionId,
}: LectureProps) => {
  const [isEditingHeading, setIsEditingHeading] = useState(false);
  const [isBottomExtensionOpen, setIsBottomExtensionOpen] = useState(false);
  const [isHeadingIconsVisible, setIsHeadingIconsVisible] = useState(false);
  const [isSelectingContentType, setIsSelectingContentType] = useState(false);

  const dispatch = useAppDispatch();

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updatedLecture({
        courseDraftId,
        curriculumSectionId: sectionId,
        lectureId: lecture.id,
        newValue: event.target.value,
        propertyName: 'name',
      })
    );
  };

  const onClickCancelHeadingEdit = () => {
    setIsHeadingIconsVisible(false);
    setIsEditingHeading(false);
  };

  const onClickSaveHeadingEdit = () => {
    setIsHeadingIconsVisible(false);
    setIsEditingHeading(false);
  };

  const onClickDeleteIcon = () => {
    dispatch(
      deletedLecture({
        courseDraftId,
        curriculumSectionId: sectionId,
        lectureId: lecture.id,
      })
    );
  };

  const onClickAddContent = () => {
    setIsSelectingContentType((previousState) => !previousState);
  };

  const onMouseEnter = () => {
    setIsHeadingIconsVisible(true);
  };

  const onMouseLeave = () => {
    setIsHeadingIconsVisible(false);
  };

  return (
    <LectureContext.Provider
      value={{
        lecture,
      }}
    >
      <Stack
        sx={{
          flexDirection: 'column',
        }}
      >
        {isEditingHeading ? (
          <Stack
            onMouseDown={(event) => event.stopPropagation()}
            sx={{
              flexDirection: 'row',
              gap: 1,
              p: 1,
              border: '1px solid',
              borderColor: 'text.primary',
              bgcolor: 'background.default',
            }}
          >
            <Stack
              sx={{
                flexDirection: 'column',
                justifyContent: 'center',
                flex: 1,
                gap: 1,
              }}
            >
              <Stack
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography>Lecture {index + 1}:</Typography>
                <InputFieldWithMaxCharacters
                  onChange={onChangeTitle}
                  maxInputLength={80}
                  value={lecture.name}
                  placeholder="Enter a title"
                  autofocus={true}
                  fontSize={14}
                  sx={{
                    width: '80%',
                    py: 0.5,
                  }}
                />
              </Stack>
              <SaveAndCancelButton
                saveButtonText="Save Lecture"
                onClickCancel={onClickCancelHeadingEdit}
                onClickSave={onClickSaveHeadingEdit}
              />
            </Stack>
          </Stack>
        ) : (
          <Stack
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              p: 1,
              border: '1px solid',
              borderColor: 'text.primary',
              bgcolor: 'background.default',
            }}
          >
            <Heading
              isHeadingIconsVisible={isHeadingIconsVisible}
              itemName={'Lecture'}
              index={index}
              title={lecture.name}
              setIsEditingHeading={setIsEditingHeading}
              onClickDeleteIcon={onClickDeleteIcon}
            />
            {isHeadingIconsVisible && (
              <Stack
                sx={{
                  flexDirection: 'row',
                  gap: 1,
                }}
              >
                <Box
                  onMouseDown={(event) => event.stopPropagation()}
                  onClick={onClickAddContent}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    outline: '1px solid',
                    outlineColor: 'text.primary',
                    px: 1,
                    gap: 0.5,
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none',
                    userSelect: 'none',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'background.paperDarker',
                    },
                  }}
                >
                  {isSelectingContentType ? (
                    <>
                      <RemoveIcon
                        sx={{
                          fontSize: 18,
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <AddIcon
                        sx={{
                          fontSize: 18,
                        }}
                      />
                    </>
                  )}
                  <Typography
                    sx={{
                      fontWeight: 500,
                    }}
                  >
                    Content
                  </Typography>
                </Box>
                <BottomExtensionOpener
                  isOpen={isBottomExtensionOpen}
                  setIsOpen={setIsBottomExtensionOpen}
                />
                <MemoDraghandle />
              </Stack>
            )}
          </Stack>
        )}
        {isSelectingContentType && (
          <Box onMouseDown={(event) => event.stopPropagation()}>
            <SelectContentType />
          </Box>
        )}
        {isBottomExtensionOpen && <BottomExtension />}
      </Stack>
    </LectureContext.Provider>
  );
};

type ContentType = 'video';

const SelectContentType = () => {
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
          {activeContentType === 'video' && <SelectVideo />}
        </Box>
      )}
    </>
  );
};

const SelectVideo = () => {
  const [file, setFile] = useState<File | null>(null);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

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
                <Typography>Processing</Typography>
              </Box>
              <Box
                sx={{
                  width: '25%',
                }}
              >
                <Typography>{new Date().toLocaleDateString()}</Typography>
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
                This video is still being processed. We will send you an email
                when it is ready.
              </Typography>
            </Stack>
          </Stack>
        </>
      )}
    </>
  );
};

const StyledLabel = styled('label')({});

export const MemoLecture = memo(Lecture);
