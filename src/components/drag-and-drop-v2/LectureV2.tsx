import { ChangeEvent, useState } from 'react';
import {
  Lesson,
  deletedLecture,
  updatedLecture,
} from '../../features/courseDraftsSlice';
import { useCurriculumSectionContext } from '../../hooks/useCurriculumSectionContext';
import { useDragAndDropContext } from './useDragAndDropContext';
import { useEditableCurriculumItem } from '../../hooks/useEditableCurriculumItem';
import { useAppDispatch } from '../../app/hooks';
import { LectureContext } from '../../contexts/LectureContext';
import { Paper, Stack } from '@mui/material';
import { BottomExtensionOpener } from '../curriculum/lecture/BottomExtensionOpener';
import { EditHeading } from '../curriculum/EditHeading';
import { BottomExtension } from '../curriculum/lecture/BottomExtension';
import { HeadingV2 } from './HeadingV2';

interface LectureProps {
  lecture: Lesson;
  index: number;
}

export const LectureV2 = ({ lecture, index }: LectureProps) => {
  const [isBottomExtensionOpen, setIsBottomExtensionOpen] = useState(false);
  const { courseDraftId, curriculumSection } = useCurriculumSectionContext();
  const { currentlyDraggedItemId } = useDragAndDropContext();

  const isDraggingSomething = Boolean(currentlyDraggedItemId);
  const isBeingDragged = currentlyDraggedItemId === lecture.id;

  const { isHeadingVisible, changeHeadingVisibility } =
    useEditableCurriculumItem(!isDraggingSomething);

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
