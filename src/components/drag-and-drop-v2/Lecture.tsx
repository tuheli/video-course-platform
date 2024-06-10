import { ChangeEvent, memo, useState } from 'react';
import {
  Lesson,
  deletedLecture,
  updatedLecture,
} from '../../features/courseDraftsSlice';
import { useAppDispatch } from '../../app/hooks';
import { LectureContext } from '../../contexts/LectureContext';
import { Stack, Typography } from '@mui/material';
import { Heading } from './Heading';
import { InputFieldWithMaxCharacters } from '../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { SaveAndCancelButton } from '../curriculum/SaveAndCancelButton';
import Draghandle from './Draghandle';
import { BottomExtensionOpener } from '../curriculum/lecture/BottomExtensionOpener';
import { BottomExtension } from '../curriculum/lecture/BottomExtension';

export interface LectureProps {
  lecture: Lesson;
  index: number;
  courseDraftId: string;
  sectionId: string;
}

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
                <Draghandle />
              </>
            )}
          </Stack>
        )}
        {isBottomExtensionOpen && <BottomExtension />}
      </Stack>
    </LectureContext.Provider>
  );
};

export default memo(Lecture);
