import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { deletedCurriculumSection } from '../../features/courseDraftsSlice';

interface DeleteCurriculumSectionButtonProps {
  courseDraftId: string;
  curriculumSectionId: string;
}

export const DeleteCurriculumSectionButton = ({
  courseDraftId,
  curriculumSectionId,
}: DeleteCurriculumSectionButtonProps) => {
  const dispatch = useAppDispatch();
  const cursor = 'pointer';

  const onClick = () => {
    dispatch(deletedCurriculumSection({ courseDraftId, curriculumSectionId }));
  };

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          cursor,
        },
      }}
    >
      <DeleteIcon
        sx={{
          fontSize: 17,
        }}
      />
    </Box>
  );
};
