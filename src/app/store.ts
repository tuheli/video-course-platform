import { configureStore } from '@reduxjs/toolkit';
import specialOfferSlice from '../features/specialOfferSlice';
import cartSlice from '../features/cartSlice';
import favoritesSlice from '../features/favoritesSlice';

export const store = configureStore({
  reducer: {
    specialOffer: specialOfferSlice,
    cart: cartSlice,
    favorites: favoritesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
