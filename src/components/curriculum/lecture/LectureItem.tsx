import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import {
  Lesson,
  deletedLecture,
  updatedLectureTitle,
} from '../../../features/courseDraftsSlice';
import { useEditableCurriculumItem } from '../../../hooks/useEditableCurriculumItem';
import { EditCurriculumItemLayout } from '../EditCurriculumItemLayout';
import { SectionItemHeadingLayout } from '../SectionItemHeadingLayout';
import { useCurriculumSectionContext } from '../../../hooks/useCurriculumSectionContext';

interface LectureItemProps {
  lecture: Lesson;
  index: number;
}

export const LectureItem = ({ lecture, index }: LectureItemProps) => {
  const { isHeadingPartVisible, changeHeadingVisibility } =
    useEditableCurriculumItem();
  const { courseDraftId, curriculumSection } = useCurriculumSectionContext();

  const dispatch = useAppDispatch();

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
      {isHeadingPartVisible && (
        <SectionItemHeadingLayout
          itemName={'Lecture'}
          index={index}
          title={lecture.name}
          changeHeadingVisibility={changeHeadingVisibility}
          onClickDeleteIcon={onClickDeleteIcon}
        />
      )}
      {!isHeadingPartVisible && (
        <EditCurriculumItemLayout
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
