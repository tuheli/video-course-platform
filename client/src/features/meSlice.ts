import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from './usersSlice';
import { UserInDatabaseSafeWithToken } from './apiSlice';

interface InitialState {
  user: UserInDatabaseSafeWithToken | null;
}

const devUser: User = {
  credentials: {
    email: 'elias.test@gmail.com',
    password: '1234',
  },
  fullName: 'Elias Testington',
  receiveInsiderEmails: true,
};

const initialState: InitialState = {
  user: null,
};

const slice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    signedIn: (state, action: PayloadAction<UserInDatabaseSafeWithToken>) => {
      state.user = action.payload;
    },
    signedOut: (state) => {
      state.user = null;
    },
  },
});

export default slice.reducer;
export const { signedIn, signedOut } = slice.actions;
