import { useAppSelector } from '../../app/hooks';
import { AddableToFavorites } from '../../features/favoritesSlice';
import { NotLoggedInFavoritesButton } from './NotLoggedInFavoritesButton';
import { AddToFavoritesButton } from './AddToFavoritesButton';

interface AddToFavoritesSelectorProps {
  item: AddableToFavorites;
}

// NOTE: If the user is not logged in they
// cant add to favorites -> favorites will be
// stored in server. Instead the user is navigated
// to the login page

// NOTE: User state management is not yet done so
// adding to favorites in redux is allowed

// NOTE: I did not implement favorites in the server

const isUserLoggedIn = false;

export const AddToFavoritesSelector = ({
  item,
}: AddToFavoritesSelectorProps) => {
  const isInItemInFavorites = useAppSelector((state) =>
    state.favorites.items.some((favorite) => favorite.id === item.id)
  );

  if (!isUserLoggedIn) {
    return <NotLoggedInFavoritesButton />;
  }

  return (
    <>{!isInItemInFavorites ? <AddToFavoritesButton item={item} /> : null}</>
  );
};
