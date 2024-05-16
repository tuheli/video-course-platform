import { Button } from '@mui/material';

export interface AddableToCart {
  purchasableItemId: string;
}

interface AddToCartButtonProps {
  item: AddableToCart;
}

// Cart manager checks if the item is already in the cart
// If not we show add to cart button
// Cart addition opens up modal for a better compound offer with discounts
// If it is we move the client to cart page

const CartManager = () => {};

export const AddToCartButton = ({ item }: AddToCartButtonProps) => {
  const onClickAddToCart = () => {
    console.log(item, 'added to cart');
  };

  return (
    <Button variant="contained" color="secondary" onClick={onClickAddToCart}>
      Add to cart
    </Button>
  );
};
