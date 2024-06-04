import { Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface BottomExtensionOpenerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const BottomExtensionOpener = ({
  isOpen,
  setIsOpen,
}: BottomExtensionOpenerProps) => {
  const onClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <KeyboardArrowDownIcon />
    </Box>
  );
};
