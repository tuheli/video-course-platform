import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AddableToCart } from './cartSlice';

interface AddableToFavorites extends AddableToCart {}

interface InitialState {
  favorites: AddableToFavorites[];
}

const initialState: InitialState = {
  favorites: [],
};

const slice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    favoriteAdded: (state, action: PayloadAction<AddableToFavorites>) => {
      const newFavorite = action.payload;
      state.favorites.push(newFavorite);
    },
  },
});

export const { favoriteAdded } = slice.actions;
export default slice.reducer;
