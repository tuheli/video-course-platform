import { Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface EditButtonProps {
  changeHeadingVisibility: (isVisible: boolean) => void;
}

export const EditButton = ({ changeHeadingVisibility }: EditButtonProps) => {
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
