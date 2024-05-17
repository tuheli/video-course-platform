import { Stack, Typography } from '@mui/material';
import { StyledLink } from '../dropdowns/styled/StyledLink';
import { useDropdownContext } from '../../hooks/useDropdownContext';

export const EmptyCart = () => {
  const { closeMainDropdown } = useDropdownContext();

  const onClickKeepShopping = () => {
    closeMainDropdown();
  };

  return (
    <Stack
      sx={{
        gap: 1,
        alignItems: 'center',
      }}
    >
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
    </Stack>
  );
};
