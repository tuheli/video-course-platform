import { ChangeEvent, memo, useState } from 'react';
import {
  deletedLecture,
  updatedLecture,
} from '../../../features/courseDraftsSlice';
import { useAppDispatch } from '../../../app/hooks';
import { LectureContext } from '../../../contexts/LectureContext';
import { Box, Stack, Typography } from '@mui/material';
import { InputFieldWithMaxCharacters } from '../../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { SaveAndCancelButton } from '../SaveAndCancelButton';
import { BottomExtensionOpener } from './BottomExtensionOpener';
import { BottomExtension } from './BottomExtension';
import { Heading } from '../Heading';
import { LectureProps } from './types';
import { MemoDraghandle } from '../../drag-and-drop-v2/Draghandle';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { SelectContentType } from './SelectContentType';

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

export const MemoLecture = memo(Lecture);
