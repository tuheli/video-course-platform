import { Typography } from '@mui/material';
import { currencyFormatter } from './numberFormatters';
import { coursePriceFontSize } from './common';

interface NormalPriceProps {
  price: number;
}

export const NormalPrice = ({ price }: NormalPriceProps) => {
  const formattedPrice = currencyFormatter.format(price);

  return (
    <Typography
      sx={{
        color: 'text.primary',
        fontSize: coursePriceFontSize,
        fontWeight: 600,
      }}
    >
      {formattedPrice}
    </Typography>
  );
};
