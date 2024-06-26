import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';

interface DeleteButtonProps {
  isProcessingDeleteRequest?: boolean;
  onClick: () => void;
}

export const DeleteButton = ({
  isProcessingDeleteRequest,
  onClick,
}: DeleteButtonProps) => {
  return (
    <Box
      onMouseDown={(event) => event.stopPropagation()}
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          cursor: isProcessingDeleteRequest ? 'not-allowed' : 'pointer',
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
