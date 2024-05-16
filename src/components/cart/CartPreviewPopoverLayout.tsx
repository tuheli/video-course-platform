import { CartPreviewItems } from './CartPreviewItems';
import { Box, Stack } from '@mui/material';
import { GoToCartButton } from './GoToCartButton';
import { CartTotal } from './CartTotal';

export const CartPreviewPopoverLayout = () => {
  return (
    <>
      <Box
        sx={{
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <CartPreviewItems />
      </Box>
      <Stack
        sx={{
          gap: 0.5,
          justifyContent: 'left',
          px: 2,
        }}
      >
        <CartTotal />
        <GoToCartButton color="primary" />
      </Stack>
    </>
  );
};
