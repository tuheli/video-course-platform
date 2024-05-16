import { configureStore } from '@reduxjs/toolkit';
import specialOfferSlice from '../features/specialOfferSlice';

export const store = configureStore({
  reducer: {
    specialOffer: specialOfferSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
