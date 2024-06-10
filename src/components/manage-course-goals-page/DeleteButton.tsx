import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteButtonProps {
  cursor: 'pointer' | 'not-allowed';
  onClick: () => void;
  fontSize: number;
}

export const DeleteButton = ({
  onClick,
  cursor,
  fontSize,
}: DeleteButtonProps) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid',
        borderLeft: 'none',
        '&:hover': {
          cursor,
        },
      }}
    >
      <DeleteIcon
        sx={{
          fontSize,
        }}
      />
    </Box>
  );
};
