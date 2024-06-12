import { Box, SxProps } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteButtonProps {
  cursor: 'pointer' | 'not-allowed';
  onClick: () => void;
  fontSize?: number;
  sx?: SxProps;
}

export const DeleteButton = ({
  onClick,
  cursor,
  fontSize,
  sx,
}: DeleteButtonProps) => {
  return (
    <Box
      onMouseDown={(event) => event.stopPropagation()}
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
        ...sx,
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
