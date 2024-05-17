import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import { StyledTransparencyBox } from '../dropdowns/styled/StyledTransparencyBox';
import { StyledBox } from '../dropdowns/styled/StyledBox';
import { EmptyCart } from './EmptyCart';
import { useAppSelector } from '../../app/hooks';
import { CartPreviewPopoverLayout } from './CartPreviewPopoverLayout';
import { Box, Typography } from '@mui/material';
import { useDropdownContext } from '../../hooks/useDropdownContext';
import { MainDropdownOpener } from '../dropdowns/dropdown-openers/MainDropdownOpener';

const emptyCartWidth = 260;
const maxCartPreviewHeight = 600;
const cartPreviewWidth = 330;
const renderIconSize = 26;
const itemCountOffset = -6;

interface RenderIconProps {
  itemCountInCart: number;
}

const RenderIcon = ({ itemCountInCart }: RenderIconProps) => {
  const { isDropdownOpen } = useDropdownContext();
  const isCartEmpty = itemCountInCart === 0;

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        p: 1,
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
            top: itemCountOffset,
            right: itemCountOffset,
            width: renderIconSize,
            height: renderIconSize,
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
          {itemCountInCart}
        </Typography>
      )}
    </Box>
  );
};

export const CartDropdown = () => {
  const itemCountInCart = useAppSelector((state) => state.cart.items.length);
  const isCartEmpty = itemCountInCart === 0;

  const RenderThing = () => {
    return <RenderIcon itemCountInCart={itemCountInCart} />;
  };

  return (
    <MainDropdownOpener RenderComponent={RenderThing} forceOpen={false}>
      <StyledTransparencyBox
        sx={{
          bottom: 0,
          right: 0,
        }}
      >
        <StyledBox
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            py: 2,
            width: isCartEmpty ? emptyCartWidth : cartPreviewWidth,
            maxHeight: isCartEmpty ? undefined : maxCartPreviewHeight,
          }}
        >
          {isCartEmpty && <EmptyCart />}
          {!isCartEmpty && <CartPreviewPopoverLayout />}
        </StyledBox>
      </StyledTransparencyBox>
    </MainDropdownOpener>
  );
};
