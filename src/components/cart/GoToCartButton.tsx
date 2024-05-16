import { Button } from '@mui/material';
import { useClosePopover } from '../../hooks/useClosePopover';

interface GoToCartButtonProps {
  fullWidth?: boolean;
}

export const GoToCartButton = ({ fullWidth = true }: GoToCartButtonProps) => {
  const closePopover = useClosePopover();

  const onClickGoToCart = () => {
    closePopover();
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      fullWidth={fullWidth}
      onClick={onClickGoToCart}
    >
      Go to cart
    </Button>
  );
};
