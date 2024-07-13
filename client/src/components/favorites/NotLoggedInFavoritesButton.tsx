import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { favoritesButtonSx } from './common';

// TODO: Remove the active animation when the
// onClick navigation is implemented

export const NotLoggedInFavoritesButton = () => {
  const onClickFavoriteIcon = () => {};

  return (
    <IconButton
      sx={{
        ...favoritesButtonSx,
        '&:active': {
          transform: 'scale(0.95)',
          transition: 'transform 0.2s ease-in-out',
        },
      }}
      onClick={onClickFavoriteIcon}
    >
      <FavoriteBorderIcon />
    </IconButton>
  );
};
