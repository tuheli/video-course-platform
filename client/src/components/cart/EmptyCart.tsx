import { Paper, Stack, Typography } from '@mui/material';
import { StyledLink } from '../dropdowns/styled/StyledLink';
import { useDropdownContext } from '../../hooks/useDropdownContext';

export const EmptyCart = () => {
  const { closeMainDropdown } = useDropdownContext();

  const onClickKeepShopping = () => {
    closeMainDropdown();
  };

  return (
    <Paper
      sx={{
        p: 2,
        width: 200,
      }}
    >
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
    </Paper>
  );
};
