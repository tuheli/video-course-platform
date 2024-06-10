import { ChangeEvent, memo, useState } from 'react';
import {
  deletedLecture,
  updatedLecture,
} from '../../../features/courseDraftsSlice';
import { useAppDispatch } from '../../../app/hooks';
import { LectureContext } from '../../../contexts/LectureContext';
import { Stack, Typography } from '@mui/material';
import { InputFieldWithMaxCharacters } from '../../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { SaveAndCancelButton } from '../SaveAndCancelButton';
import { BottomExtensionOpener } from './BottomExtensionOpener';
import { BottomExtension } from './BottomExtension';
import { Heading } from '../Heading';
import { LectureProps } from './types';
import { MemoDraghandle } from '../../drag-and-drop-v2/Draghandle';

const Lecture = ({
  lecture,
  index,
  courseDraftId,
  sectionId,
}: LectureProps) => {
  const [isEditingHeading, setIsEditingHeading] = useState(false);
  const [isBottomExtensionOpen, setIsBottomExtensionOpen] = useState(false);
  const [isHeadingIconsVisible, setIsHeadingIconsVisible] = useState(false);

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
              <>
                <BottomExtensionOpener
                  isOpen={isBottomExtensionOpen}
                  setIsOpen={setIsBottomExtensionOpen}
                />
                <MemoDraghandle />
              </>
            )}
          </Stack>
        )}
        {isBottomExtensionOpen && <BottomExtension />}
      </Stack>
    </LectureContext.Provider>
  );
};

export const MemoLecture = memo(Lecture);
