import { Button } from '@mui/material';
import { useContext } from 'react';
import { CloseMainDropdownContext } from '../../../contexts/CloseMainDropdownContext';

interface DropdownButtonButtonProps {
  text: string;
  onClick?: () => void;
}

export const DropdownButton = ({
  text,
  onClick,
}: DropdownButtonButtonProps) => {
  const closeMainDropdown = useContext(CloseMainDropdownContext);

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
