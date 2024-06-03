import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import {
  Lesson,
  deletedLecture,
  updatedLectureTitle,
} from '../../../features/courseDraftsSlice';
import { useEditableCurriculumItem } from '../../../hooks/useEditableCurriculumItem';
import { EditHeading } from '../EditHeading';
import { Heading } from '../Heading';
import { useCurriculumSectionContext } from '../../../hooks/useCurriculumSectionContext';

interface LectureProps {
  lecture: Lesson;
  index: number;
}

export const Lecture = ({ lecture, index }: LectureProps) => {
  const { isHeadingVisible, changeHeadingVisibility } =
    useEditableCurriculumItem();
  const { courseDraftId, curriculumSection } = useCurriculumSectionContext();

  const dispatch = useAppDispatch();

  const isEditVisible = !isHeadingVisible;

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updatedLectureTitle({
        courseDraftId,
        curriculumSectionId: curriculumSection.id,
        lectureId: lecture.id,
        newLectureTitle: event.target.value,
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
    <>
      {isHeadingVisible && (
        <Heading
          itemName={'Lecture'}
          index={index}
          title={lecture.name}
          changeHeadingVisibility={changeHeadingVisibility}
          onClickDeleteIcon={onClickDeleteIcon}
        />
      )}
      {isEditVisible && (
        <EditHeading
          title={`Lecture ${index + 1}`}
          titleValue={lecture.name}
          saveButtonText="Save Lecture"
          onChangeTitle={onChangeTitle}
          onClickCancel={onClickCancel}
          onClickSave={onClickSave}
        />
      )}
    </>
  );
};
