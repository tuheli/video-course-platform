import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from './usersSlice';

interface InitialState {
  user: User | null;
}

const initialState: InitialState = {
  user: null,
};

const slice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    signedIn: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export default slice.reducer;
export const { signedIn } = slice.actions;
