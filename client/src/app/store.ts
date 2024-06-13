import { configureStore } from '@reduxjs/toolkit';
import specialOfferSlice from '../features/specialOfferSlice';
import cartSlice from '../features/cartSlice';
import favoritesSlice from '../features/favoritesSlice';
import languageSlice from '../features/languageSlice';
import userSlice from '../features/usersSlice';
import meSlice from '../features/meSlice';
import courseCreationSlice from '../features/courseCreationSlice';
import courseDraftsSlice from '../features/courseDraftsSlice';
import userPreferencesSlice from '../features/userPreferencesSlice';
import notificationSlice from '../features/notificationSlice';
import { apiSlice } from '../features/apiSlice';

export const store = configureStore({
  reducer: {
    specialOffer: specialOfferSlice,
    cart: cartSlice,
    favorites: favoritesSlice,
    language: languageSlice,
    users: userSlice,
    me: meSlice,
    courseCreation: courseCreationSlice,
    courseDrafts: courseDraftsSlice,
    userPreferences: userPreferencesSlice,
    notification: notificationSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
