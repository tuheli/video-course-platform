import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserInDatabaseSafeWithToken } from './apiSlice';

interface InitialState {
  user: UserInDatabaseSafeWithToken | null;
}

export type SignedInPayload = UserInDatabaseSafeWithToken & {
  staySignedIn?: boolean;
};

const initialState: InitialState = {
  user: null,
};

const saveSignedInUserToLocalStorage = (
  userInDatabaseSafeWithToken: UserInDatabaseSafeWithToken
) => {
  localStorage.setItem(
    'signedInUser',
    JSON.stringify(userInDatabaseSafeWithToken)
  );
};

const removeSignedInUserFromLocalStorage = () => {
  localStorage.removeItem('signedInUser');
};

const slice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    signedIn: (state, action: PayloadAction<SignedInPayload>) => {
      state.user = action.payload;

      if (action.payload.staySignedIn) {
        saveSignedInUserToLocalStorage(action.payload);
      }
    },
    signedOut: (state) => {
      state.user = null;
      removeSignedInUserFromLocalStorage();
    },
  },
});

export default slice.reducer;
export const { signedIn, signedOut } = slice.actions;
