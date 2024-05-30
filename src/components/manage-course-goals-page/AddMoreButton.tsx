import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddMoreButtonProps {
  onClick: () => void;
}

export const AddMoreButton = ({ onClick }: AddMoreButtonProps) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: 'secondary.light',
        width: 'fit-content',
        py: 1,
        pr: 1,
        gap: 1,
        '&:hover': {
          cursor: 'pointer',
          color: 'secondary.dark',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <AddIcon />
      </Box>
      <Typography
        sx={{
          fontWeight: 500,
        }}
      >
        Add more to your response
      </Typography>
    </Box>
  );
};
