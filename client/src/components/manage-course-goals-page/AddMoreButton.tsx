import { Box, SxProps, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddMoreButtonProps {
  text?: string;
  sx?: SxProps;
  addIconSx?: SxProps;
  addIconContainerSx?: SxProps;
  onClick: () => void;
}

export const AddMoreButton = ({
  text = 'Add more to your response',
  sx,
  addIconSx,
  addIconContainerSx,
  onClick,
}: AddMoreButtonProps) => {
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
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          ...addIconContainerSx,
        }}
      >
        <AddIcon
          sx={{
            ...addIconSx,
          }}
        />
      </Box>
      {text && (
        <Typography
          sx={{
            fontWeight: 500,
          }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );
};
