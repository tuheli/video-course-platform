import { useCreateCurriculumSectionMutation } from '../../../features/apiSlice';
import { AddMoreButtonDarkVariant } from '../../manage-course-goals-page/AddMoreButtonDarkVariant';

interface AddSectionButtonProps {
  courseDraftId: number;
}

export const AddSectionButton = ({ courseDraftId }: AddSectionButtonProps) => {
  const [createCurriculumSection] = useCreateCurriculumSectionMutation();

  const onClick = async () => {
    try {
      await createCurriculumSection({ courseDraftId });
    } catch (error) {
      console.log('error creating section', error);
    }
  };

  return <AddMoreButtonDarkVariant text="Section" onClick={onClick} />;
};
