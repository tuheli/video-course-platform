import { useAppDispatch } from '../../../app/hooks';
import { addedCurriculumSection } from '../../../features/courseDraftsSlice';
import { useCourseDraft } from '../../../hooks/useCourseDraft';
import { AddMoreButtonDarkVariant } from '../../manage-course-goals-page/AddMoreButtonDarkVariant';

export const AddSectionButton = () => {
  const courseDraft = useCourseDraft();
  const dispatch = useAppDispatch();

  const onClick = () => {
    if (!courseDraft) return;
    dispatch(addedCurriculumSection({ courseDraftId: courseDraft.id }));
  };

  return <AddMoreButtonDarkVariant text="Section" onClick={onClick} />;
};
