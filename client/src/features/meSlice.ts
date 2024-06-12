import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from './usersSlice';

interface InitialState {
  user: User | null;
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
  user: devUser,
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
