import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AddableToCart {
  purchasableItemId: string;
}

interface InitialState {
  items: AddableToCart[];
}

const initialState: InitialState = {
  items: [],
};

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    itemAddedToCart: (state, action: PayloadAction<AddableToCart>) => {
      const newItem = action.payload;
      state.items.push(newItem);
    },
  },
});

export const { itemAddedToCart } = slice.actions;
export default slice.reducer;
