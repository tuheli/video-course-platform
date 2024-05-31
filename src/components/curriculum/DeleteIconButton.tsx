import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';

interface DeleteButtonProps {
  onClick: () => void;
}

export const DeleteIconButton = ({ onClick }: DeleteButtonProps) => {
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
      <DeleteIcon
        sx={{
          fontSize: 17,
        }}
      />
    </Box>
  );
};
