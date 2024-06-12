import { Box, Paper, Stack } from '@mui/material';
import { CartPreviewItems } from '../../../cart/CartPreviewItems';
import { CartTotal } from '../../../cart/CartTotal';
import { GoToCartButton } from '../../../cart/GoToCartButton';
import { EmptyCart } from '../../../cart/EmptyCart';
import { useAppSelector } from '../../../../app/hooks';

export const Dropdown = () => {
  const isCartEmpty = useAppSelector((state) => state.cart.items.length === 0);

  return (
    <Box
      sx={{
        bgcolor: 'transparent',
      }}
    >
      {isCartEmpty && <EmptyCart />}
      {!isCartEmpty && (
        <Paper
          sx={{
            p: 0,
          }}
        >
          <Box
            sx={{
              overflowY: 'auto',
              overflowX: 'hidden',
              maxWidth: 320,
              maxHeight: 500,
              pt: 2,
              pl: 2,
              pr: 0,
            }}
          >
            <CartPreviewItems />
          </Box>
          <Stack
            sx={{
              gap: 0.5,
              justifyContent: 'left',
              boxShadow: ' 0px -2px 5px 0px rgba(0,0,0,0.2)',
              p: 2,
            }}
          >
            <CartTotal />
            <GoToCartButton color="primary" />
          </Stack>
        </Paper>
      )}
    </Box>
  );
};
