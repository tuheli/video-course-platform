import { styled } from '@mui/material';

export const StyledListItem = styled('li')(() => ({
  ':not(:last-child)': {
    marginBottom: 8,
  },
}));
