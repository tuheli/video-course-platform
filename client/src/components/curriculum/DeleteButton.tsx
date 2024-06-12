import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';

interface DeleteButtonProps {
  onClick: () => void;
}

export const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <Box
      onMouseDown={(event) => event.stopPropagation()}
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
