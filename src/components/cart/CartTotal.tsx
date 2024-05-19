import { useAppSelector } from '../../app/hooks';
import { Stack, Typography } from '@mui/material';
import { currencyFormatter } from '../../utils/numberFormatters';

export const CartTotal = () => {
  const totalPrice = useAppSelector((state) =>
    state.cart.items.reduce((acc, item) => acc + item.priceEur, 0)
  );
  const totalListPrice = useAppSelector((state) =>
    state.cart.items.reduce((acc, item) => acc + item.listPrice, 0)
  );

  const isDiscounted = totalPrice < totalListPrice;

  const formattedTotalPrice = currencyFormatter.format(totalPrice);
  const formattedTotalListPrice = currencyFormatter.format(totalListPrice);

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Typography
        sx={{
          color: 'text.primary',
          fontWeight: 600,
        }}
      >
        Total: {formattedTotalPrice}
      </Typography>
      <Typography
        sx={{
          color: 'text.secondary',
          textDecoration: 'line-through',
          fontSize: 14,
        }}
      >
        {isDiscounted && `${formattedTotalListPrice}`}
      </Typography>
    </Stack>
  );
};
