import { Button } from '@mui/material';
import { useClosePopover } from '../../hooks/useClosePopover';

interface GoToCartButtonProps {
  fullWidth?: boolean;
  color?: 'secondary' | 'primary';
}

export const GoToCartButton = ({
  fullWidth = true,
  color = 'secondary',
}: GoToCartButtonProps) => {
  const closePopover = useClosePopover();

  const onClickGoToCart = () => {
    closePopover();
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
