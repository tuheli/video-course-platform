import { useAppSelector } from '../../app/hooks';
import { GoToCartButton } from './GoToCartButton';
import { AddToCartButton } from './AddToCartButton';
import { AddableToCart } from '../../features/cartSlice';

interface CartManagerProps {
  item: AddableToCart;
}

export const AddToCartButtonSelector = ({ item }: CartManagerProps) => {
  const isItemInCart = useAppSelector((state) =>
    state.cart.items.some((cartItem) => cartItem.id === item.id)
  );

  return (
    <>{isItemInCart ? <GoToCartButton /> : <AddToCartButton item={item} />}</>
  );
};
