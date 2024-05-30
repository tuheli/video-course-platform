import { useAppDispatch } from '../../../app/hooks';
import { addedCurriculumSection } from '../../../features/courseDraftsSlice';
import { useCourseDraft } from '../../../hooks/useCourseDraft';
import { AddMoreButton } from '../../manage-course-goals-page/AddMoreButton';

export const AddCurriculumSectionButton = () => {
  const courseDraft = useCourseDraft();
  const dispatch = useAppDispatch();

  const onClick = () => {
    if (!courseDraft) return;
    dispatch(addedCurriculumSection({ courseDraftId: courseDraft.id }));
  };

  return (
    <AddMoreButton
      text="Section"
      onClick={onClick}
      sx={{
        pl: 1,
        border: '1px solid',
        borderColor: 'text.primary',
        color: 'text.primary',
        bgcolor: 'background.default',
        '&:hover': {
          bgcolor: 'background.paperDarker',
          cursor: 'pointer',
        },
      }}
    />
  );
};
