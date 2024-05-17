import { Button } from '@mui/material';
import { useDropdownContext } from '../../../hooks/useDropdownContext';

interface DropdownButtonButtonProps {
  text: string;
  onClick?: () => void;
}

export const DropdownButton = ({
  text,
  onClick,
}: DropdownButtonButtonProps) => {
  const { closeMainDropdown } = useDropdownContext();

  const onClickWithClose = () => {
    onClick && onClick();
    closeMainDropdown();
  };

  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      onClick={onClickWithClose}
    >
      {text}
    </Button>
  );
};
