import { ChangeEvent } from 'react';
import { EditCurriculumItemLayout } from './EditCurriculumItemLayout';
import { useCurriculumSectionContext } from '../../../hooks/useCurriculumSectionContext';

export const NewLectureCard = () => {
  const { setEditingItemType } = useCurriculumSectionContext();

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {};

  const onClickCancel = () => {
    setEditingItemType(undefined);
  };

  const onClickSaveLecture = () => {};

  return (
    <EditCurriculumItemLayout
      title="New lecture:"
      titleValue=""
      saveButtonText="Add Lecture"
      onChangeTitle={onChangeTitle}
      onClickCancel={onClickCancel}
      onClickSave={onClickSaveLecture}
    />
  );
};
