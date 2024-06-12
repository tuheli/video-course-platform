import { SxProps } from '@mui/material';
import { AddMoreButton } from './AddMoreButton';

interface AddMoreButtonProps {
  text?: string;
  addIconSx?: SxProps;
  addIconContainerSx?: SxProps;
  sx?: SxProps;
  onClick: () => void;
}

export const AddMoreButtonDarkVariant = ({
  text = 'Add more to your response',
  addIconSx,
  addIconContainerSx,
  sx,
  onClick,
}: AddMoreButtonProps) => {
  return (
    <AddMoreButton
      onClick={onClick}
      text={text}
      sx={{
        pl: 1,
        pr: 2,
        border: '1px solid',
        borderColor: 'text.primary',
        color: 'text.primary',
        bgcolor: 'background.default',
        '&:hover': {
          bgcolor: 'background.paperDarker',
          cursor: 'pointer',
        },
        ...sx,
      }}
      addIconSx={addIconSx}
      addIconContainerSx={addIconContainerSx}
    />
  );
};
