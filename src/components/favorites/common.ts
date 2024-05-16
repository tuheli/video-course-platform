import { SxProps, Theme } from '@mui/material';

export const favoritesButtonSx: SxProps<Theme> | undefined = {
  color: (theme) => theme.palette.secondary.light,
  '&:hover': {
    transform: 'scale(1.15)',
    transition: 'transform 0.2s ease-in-out',
  },
};
