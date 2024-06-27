import { store } from '../../../app/store';
import { useCreateCurriculumSectionMutation } from '../../../features/apiSlice';
import { useSaveCurriculum } from '../../../hooks/useSaveCurriculum';
import { AddMoreButtonDarkVariant } from '../../manage-course-goals-page/AddMoreButtonDarkVariant';

interface AddSectionButtonProps {
  courseDraftId: number;
}

export const AddSectionButton = ({ courseDraftId }: AddSectionButtonProps) => {
  const [createCurriculumSection] = useCreateCurriculumSectionMutation();
  const { saveCurriculum } = useSaveCurriculum();

  const onClick = async () => {
    try {
      const courseDraft = store
        .getState()
        .courseDrafts.find(({ id }) => id === courseDraftId);
      if (!courseDraft) {
        throw new Error('Course draft not found');
      }
      await saveCurriculum(courseDraft);
      await createCurriculumSection({ courseDraftId });
    } catch (error) {
      console.log('error creating section', error);
    }
  };

  return <AddMoreButtonDarkVariant text="Section" onClick={onClick} />;
};
