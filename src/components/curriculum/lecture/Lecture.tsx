import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import {
  Lesson,
  deletedLecture,
  updatedLecture,
} from '../../../features/courseDraftsSlice';
import { useEditableCurriculumItem } from '../../../hooks/useEditableCurriculumItem';
import { EditHeading } from '../EditHeading';
import { Heading } from '../Heading';
import { useCurriculumSectionContext } from '../../../hooks/useCurriculumSectionContext';
import { BottomExtension } from './BottomExtension';
import { Paper, Stack } from '@mui/material';
import { LectureContext } from '../../../contexts/LectureContext';
import { BottomExtensionOpener } from './BottomExtensionOpener';
import { Draghandle } from '../../drag-and-drop/Draghandle';
import { useDraggableContext } from '../../../hooks/useDraggableContext';

interface LectureProps {
  lecture: Lesson;
  index: number;
}

export const Lecture = ({ lecture, index }: LectureProps) => {
  const [isBottomExtensionOpen, setIsBottomExtensionOpen] = useState(false);
  const { isHeadingVisible, changeHeadingVisibility } =
    useEditableCurriculumItem();
  const { courseDraftId, curriculumSection } = useCurriculumSectionContext();
  const { isBeingDragged } = useDraggableContext();

  const dispatch = useAppDispatch();

  const isEditVisible = !isHeadingVisible;

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updatedLecture({
        courseDraftId,
        curriculumSectionId: curriculumSection.id,
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
        curriculumSectionId: curriculumSection.id,
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
          outline: isBeingDragged ? '2px solid' : 'none',
          outlineColor: 'secondary.light',
          borderColor: isBeingDragged ? 'transparent' : 'text.primary',
        }}
      >
        <Stack>
          {isHeadingVisible && (
            <Heading
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
              <Draghandle
                sx={{
                  border: 'none',
                }}
              />
            </Heading>
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
