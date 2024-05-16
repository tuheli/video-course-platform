import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AddableToCart } from './cartSlice';

export interface AddableToFavorites extends AddableToCart {}

interface InitialState {
  items: AddableToFavorites[];
}

const initialState: InitialState = {
  items: [],
};

const slice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    favoriteAdded: (state, action: PayloadAction<AddableToFavorites>) => {
      const newFavorite = action.payload;
      state.items.push(newFavorite);
    },
  },
});

export const { favoriteAdded } = slice.actions;
export default slice.reducer;
