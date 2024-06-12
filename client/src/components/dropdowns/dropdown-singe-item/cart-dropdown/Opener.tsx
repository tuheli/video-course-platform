import { Box, Typography } from '@mui/material';
import { useDropdownContext } from '../../../../hooks/useDropdownContext';
import { useAppSelector } from '../../../../app/hooks';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';

export const Opener = () => {
  const { isDropdownOpen } = useDropdownContext();
  const itemsInCartCount = useAppSelector((state) => state.cart.items.length);

  const isCartEmpty = itemsInCartCount === 0;

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
      }}
    >
      <ShoppingCartIcon
        sx={{
          color: isDropdownOpen ? 'secondary.main' : 'text.primary',
        }}
      />
      {!isCartEmpty && (
        <Typography
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            transform: 'translateY(-50%) translateX(50%)',
            width: 22,
            height: 22,
            borderRadius: '50%',
            color: 'white',
            bgcolor: 'secondary.light',
            textAlign: 'center',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          {itemsInCartCount}
        </Typography>
      )}
    </Box>
  );
};
