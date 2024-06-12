import { Divider, Stack } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { CartPreviewItem } from './CartPreviewItem';

export const CartPreviewItems = () => {
  const itemsInCart = useAppSelector((state) => state.cart.items);

  return (
    <Stack
      sx={{
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {itemsInCart.map((courseItem, index) => {
        const isLastItem = index === itemsInCart.length - 1;
        return (
          <Stack
            key={index}
            sx={{
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <CartPreviewItem key={index} courseItem={courseItem} />
            {!isLastItem && <Divider />}
          </Stack>
        );
      })}
    </Stack>
  );
};
