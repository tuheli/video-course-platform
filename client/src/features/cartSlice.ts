import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Course } from '../../data/courseData';

export type AddableToCart = Course;

interface InitialState {
  items: AddableToCart[];
}

const initialState: InitialState = {
  items: [],
};

// TODO: Cart state should be stored in local storage
// so non logged in users can have their cart saved.

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
