import { configureStore } from '@reduxjs/toolkit';
import { anilistApi } from './api';
import selectedCardsSlice from './selectedCardsSlice';
import localStorageReducer from './localStorageSlice';

export const store = configureStore({
  reducer: {
    [anilistApi.reducerPath]: anilistApi.reducer,
    selectedCards: selectedCardsSlice,
    localStorage: localStorageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(anilistApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
