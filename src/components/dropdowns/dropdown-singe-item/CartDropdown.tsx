import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import { IconDropdownOpener } from '../dropdown-openers/IconDropdownOpener';
import { StyledTransparencyBox } from '../styled/StyledTransparencyBox';
import { StyledBox } from '../styled/StyledBox';
import { EmptyCart } from './EmptyCart';

const isCartEmpty = true;

export const CartDropdown = () => {
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
            gap: 2,
            width: 260,
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {isCartEmpty ? <EmptyCart /> : null}
        </StyledBox>
      </StyledTransparencyBox>
    </IconDropdownOpener>
  );
};
