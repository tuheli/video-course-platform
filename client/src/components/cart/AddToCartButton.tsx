import { Button } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { AddableToCart, itemAddedToCart } from '../../features/cartSlice';
import { useDropdownContext } from '../../hooks/useDropdownContext';

export interface AddToCartButtonProps {
  item: AddableToCart;
  fullWidth?: boolean;
}

export const AddToCartButton = ({
  item,
  fullWidth = true,
}: AddToCartButtonProps) => {
  const dispatch = useAppDispatch();
  const { closeMainDropdown } = useDropdownContext();

  const onClickAddToCart = () => {
    dispatch(itemAddedToCart(item));
    closeMainDropdown();
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      fullWidth={fullWidth}
      onClick={onClickAddToCart}
    >
      Add to cart
    </Button>
  );
};
