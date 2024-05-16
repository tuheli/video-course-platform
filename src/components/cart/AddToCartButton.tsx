import { Button } from '@mui/material';
import { useClosePopover } from '../../hooks/useClosePopover';
import { useAppDispatch } from '../../app/hooks';
import { AddableToCart, itemAddedToCart } from '../../features/cartSlice';

export interface AddToCartButtonProps {
  item: AddableToCart;
}

export const AddToCartButton = ({ item }: AddToCartButtonProps) => {
  const dispatch = useAppDispatch();
  const closePopover = useClosePopover();

  const onClickAddToCart = () => {
    dispatch(itemAddedToCart(item));
    closePopover();
  };

  return (
    <Button variant="contained" color="secondary" onClick={onClickAddToCart}>
      Add to cart
    </Button>
  );
};
