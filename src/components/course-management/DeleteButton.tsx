import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteButtonProps {
  cursor: 'pointer' | 'not-allowed';
  onClick: () => void;
}

export const DeleteButton = ({ onClick, cursor }: DeleteButtonProps) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 54,
        border: '1px solid',
        borderLeft: 'none',
        '&:hover': {
          cursor,
        },
      }}
    >
      <DeleteIcon />
    </Box>
  );
};
