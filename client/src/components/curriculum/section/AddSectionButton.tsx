import { useAppDispatch } from '../../../app/hooks';
import { addedCurriculumSection } from '../../../features/courseDraftsSlice';
import { AddMoreButtonDarkVariant } from '../../manage-course-goals-page/AddMoreButtonDarkVariant';

interface AddSectionButtonProps {
  courseDraftId: number;
}

export const AddSectionButton = ({ courseDraftId }: AddSectionButtonProps) => {
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(addedCurriculumSection({ courseDraftId }));
  };

  return <AddMoreButtonDarkVariant text="Section" onClick={onClick} />;
};
