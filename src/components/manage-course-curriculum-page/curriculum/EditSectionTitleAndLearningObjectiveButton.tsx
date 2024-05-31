import { Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface EditSectionTitleAndLearningObjectiveButtonProps {
  changeHeadingVisibility: (isVisible: boolean) => void;
}

export const EditSectionTitleAndLearningObjectiveButton = ({
  changeHeadingVisibility,
}: EditSectionTitleAndLearningObjectiveButtonProps) => {
  const onClick = () => {
    changeHeadingVisibility(false);
  };

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <EditIcon
        sx={{
          fontSize: 17,
        }}
      />
    </Box>
  );
};
