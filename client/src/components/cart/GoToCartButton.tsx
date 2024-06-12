import { Button } from '@mui/material';
import { useDropdownContext } from '../../hooks/useDropdownContext';

interface GoToCartButtonProps {
  fullWidth?: boolean;
  color?: 'secondary' | 'primary';
}

export const GoToCartButton = ({
  fullWidth = true,
  color = 'secondary',
}: GoToCartButtonProps) => {
  const { closeMainDropdown } = useDropdownContext();

  const onClickGoToCart = () => {
    closeMainDropdown();
  };

  return (
    <Button
      variant="contained"
      color={color}
      fullWidth={fullWidth}
      onClick={onClickGoToCart}
    >
      Go to cart
    </Button>
  );
};
