import { ChangeEvent, memo, useState } from 'react';
import {
  Lesson,
  deletedLecture,
  updatedLecture,
} from '../../features/courseDraftsSlice';
import { useEditableCurriculumItem } from '../../hooks/useEditableCurriculumItem';
import { useAppDispatch } from '../../app/hooks';
import { LectureContext } from '../../contexts/LectureContext';
import { Paper, Stack } from '@mui/material';
import { BottomExtensionOpener } from '../curriculum/lecture/BottomExtensionOpener';
import { EditHeading } from '../curriculum/EditHeading';
import { BottomExtension } from '../curriculum/lecture/BottomExtension';
import { HeadingV2 } from './HeadingV2';

export interface LectureProps {
  lecture: Lesson;
  index: number;
  courseDraftId: string;
  sectionId: string;
}

const LectureV2 = ({
  lecture,
  index,
  courseDraftId,
  sectionId,
}: LectureProps) => {
  const [isBottomExtensionOpen, setIsBottomExtensionOpen] = useState(false);
  const { isHeadingVisible, changeHeadingVisibility } =
    useEditableCurriculumItem(false);

  const dispatch = useAppDispatch();

  const isEditVisible = !isHeadingVisible;

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

  const onClickCancel = () => {
    changeHeadingVisibility(true);
  };

  const onClickSave = () => {
    changeHeadingVisibility(true);
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

  return (
    <LectureContext.Provider
      value={{
        lecture,
      }}
    >
      <Paper
        sx={{
          p: 0,
          m: 0,
          bgcolor: 'background.paperDarker',
          border: '1px solid',
          borderRadius: 0,
          outlineColor: 'secondary.light',
        }}
      >
        <Stack>
          {isHeadingVisible && (
            <HeadingV2
              itemName={'Lecture'}
              index={index}
              title={lecture.name}
              changeHeadingVisibility={changeHeadingVisibility}
              onClickDeleteIcon={onClickDeleteIcon}
              titleSx={{
                fontWeight: 400,
              }}
              outerStackSx={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              leftStackSx={{
                flexGrow: 1,
              }}
              paperSx={{
                border: 'none',
              }}
            >
              <BottomExtensionOpener
                isOpen={isBottomExtensionOpen}
                setIsOpen={setIsBottomExtensionOpen}
              />
            </HeadingV2>
          )}
          {isEditVisible && (
            <EditHeading
              title={`Lecture ${index + 1}:`}
              titleValue={lecture.name}
              saveButtonText="Save Lecture"
              onChangeTitle={onChangeTitle}
              onClickCancel={onClickCancel}
              onClickSave={onClickSave}
            />
          )}
          {isBottomExtensionOpen && <BottomExtension />}
        </Stack>
      </Paper>
    </LectureContext.Provider>
  );
};

export default memo(LectureV2);
