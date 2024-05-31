import { ChangeEvent, useState } from 'react';
import { EditCurriculumItemLayout } from '../EditCurriculumItemLayout';
import { useCurriculumSectionContext } from '../../../hooks/useCurriculumSectionContext';
import { useAppDispatch } from '../../../app/hooks';
import { addedLecture } from '../../../features/courseDraftsSlice';

export const AddLectureCard = () => {
  const [title, setTitle] = useState('');
  const {
    courseDraftId,
    curriculumSection,
    setEditingItemType,
    setIsOptionsAnimationEnabled,
  } = useCurriculumSectionContext();
  const dispatch = useAppDispatch();

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onClickAddLecture = () => {
    dispatch(
      addedLecture({
        courseDraftId,
        curriculumSectionId: curriculumSection.id,
        lectureTitle: title,
      })
    );

    setIsOptionsAnimationEnabled(true);
    setEditingItemType(undefined);
  };

  const onClickCancel = () => {
    setIsOptionsAnimationEnabled(false);
    setEditingItemType(undefined);
  };

  return (
    <EditCurriculumItemLayout
      title="New lecture:"
      titleValue={title}
      saveButtonText="Add Lecture"
      onChangeTitle={onChangeTitle}
      onClickCancel={onClickCancel}
      onClickSave={onClickAddLecture}
    />
  );
};
