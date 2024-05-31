import { useCurriculumSectionContext } from '../../../../hooks/useCurriculumSectionContext';
import { AddMoreButton } from '../../../manage-course-goals-page/AddMoreButton';

export const AddLectureButton = () => {
  const { setEditingItemType } = useCurriculumSectionContext();

  const onClick = () => {
    setEditingItemType('addLecture');
  };

  return (
    <AddMoreButton
      text="Lecture"
      onClick={onClick}
      sx={{
        pl: 1,
        color: 'secondary.main',
        bgcolor: 'inherit',
        '&:hover': {
          cursor: 'pointer',
          color: 'secondary.dark',
        },
      }}
    />
  );
};
