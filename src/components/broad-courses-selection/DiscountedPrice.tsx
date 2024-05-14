import { Stack, Typography } from '@mui/material';
import { currencyFormatter } from './numberFormatters';
import { coursePriceFontSize } from './common';

interface DiscountedPriceProps {
  price: number;
  listPrice: number;
}

export const DiscountedPrice = ({ price, listPrice }: DiscountedPriceProps) => {
  const formattedPrice = currencyFormatter.format(price);
  const formattedListPrice = currencyFormatter.format(listPrice);

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        gap: 0.5,
      }}
    >
      <Typography
        sx={{
          fontSize: coursePriceFontSize,
          fontWeight: 600,
          mt: 0.2,
        }}
      >
        {formattedPrice}
      </Typography>
      <Typography
        sx={{
          fontSize: coursePriceFontSize - 2,
          fontWeight: 600,
          color: 'text.secondary',
          textDecoration: 'line-through',
        }}
      >
        {formattedListPrice}
      </Typography>
    </Stack>
  );
};
