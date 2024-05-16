import { Button } from '@mui/material';
import { useClosePopover } from '../../hooks/useClosePopover';

export const GoToCartButton = () => {
  const closePopover = useClosePopover();

  const onClickGoToCart = () => {
    closePopover();
  };

  return (
    <Button variant="contained" color="secondary" onClick={onClickGoToCart}>
      Go to cart
    </Button>
  );
};
