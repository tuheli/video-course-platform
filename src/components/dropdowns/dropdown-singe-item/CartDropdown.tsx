import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import { IconDropdownOpener } from '../dropdown-openers/IconDropdownOpener';
import { StyledTransparencyBox } from '../styled/StyledTransparencyBox';
import { StyledBox } from '../styled/StyledBox';
import { EmptyCart } from '../../cart/EmptyCart';
import { useAppSelector } from '../../../app/hooks';
import { CartPreviewPopoverLayout } from '../../cart/CartPreviewPopoverLayout';

const emptyCartWidth = 260;
const maxCartPreviewHeight = 600;
const cartPreviewWidth = 330;

export const CartDropdown = () => {
  const isCartEmpty = useAppSelector((state) => state.cart.items.length === 0);

  return (
    <IconDropdownOpener Icon={ShoppingCartIcon}>
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
    </IconDropdownOpener>
  );
};
