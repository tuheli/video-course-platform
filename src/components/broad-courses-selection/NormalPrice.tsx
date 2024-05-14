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
        fontSize: coursePriceFontSize,
        fontWeight: 600,
      }}
    >
      {formattedPrice}
    </Typography>
  );
};
