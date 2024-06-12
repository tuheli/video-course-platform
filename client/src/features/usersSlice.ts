import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Emulating users in database before backend implemention
// In database passwords would be hashed

export interface Credentials {
  email: string;
  password: string;
}

export interface User {
  credentials: Credentials;
  fullName: string;
  receiveInsiderEmails: boolean;
}

interface InitialState {
  users: User[];
}

const initialState: InitialState = {
  users: [],
};

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userAdded: (state, action: PayloadAction<User>) => {
      const newUser = action.payload;

      const isEmailInUse = state.users.some(
        (existingUser) =>
          existingUser.credentials.email === newUser.credentials.email
      );

      if (isEmailInUse) return;

      state.users.push(newUser);
    },
  },
});

export default slice.reducer;
export const { userAdded } = slice.actions;
