import { Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { MouseEvent } from 'react';

interface EditButtonProps {
  onClick: (event: MouseEvent) => void;
}

export const EditButton = ({ onClick }: EditButtonProps) => {
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
      <EditIcon
        sx={{
          fontSize: 17,
        }}
      />
    </Box>
  );
};
