import { configureStore } from '@reduxjs/toolkit';
import offerSlice from '../features/offerSlice';

export const store = configureStore({
  reducer: {
    offer: offerSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
