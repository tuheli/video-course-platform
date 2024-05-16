import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppDispatch } from '../../app/hooks';
import {
  AddableToFavorites,
  favoriteAdded,
} from '../../features/favoritesSlice';
import { favoritesButtonSx } from './common';

interface AddToFavoritesButtonProps {
  item: AddableToFavorites;
}

export const AddToFavoritesButton = ({ item }: AddToFavoritesButtonProps) => {
  const dispatch = useAppDispatch();

  const onClickFavoriteIcon = () => {
    dispatch(favoriteAdded(item));
  };

  return (
    <IconButton onClick={onClickFavoriteIcon}>
      <FavoriteIcon sx={favoritesButtonSx} />
    </IconButton>
  );
};
