import { Typography } from '@mui/material';
import { useContext } from 'react';
import { CloseMainDropdownContext } from '../../../contexts/CloseMainDropdownContext';
import { StyledLink } from '../styled/StyledLink';

export const EmptyCart = () => {
  const closeMainDropdown = useContext(CloseMainDropdownContext);

  const onClickKeepShopping = () => {
    closeMainDropdown();
  };

  return (
    <>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          textAlign: 'center',
        }}
      >
        Your cart is empty.
      </Typography>
      <StyledLink onClick={onClickKeepShopping}>
        <Typography
          variant="body2"
          sx={{
            color: 'secondary.main',
            fontWeight: 'bold',
          }}
        >
          Keep shopping
        </Typography>
      </StyledLink>
    </>
  );
};
