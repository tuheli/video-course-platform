import { Box, SxProps } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteButtonProps {
  cursor: 'pointer' | 'not-allowed';
  onClick: () => void;
  sx?: SxProps;
}

export const DeleteButton = ({ onClick, cursor, sx }: DeleteButtonProps) => {
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
        ...sx,
      }}
    >
      <DeleteIcon />
    </Box>
  );
};
