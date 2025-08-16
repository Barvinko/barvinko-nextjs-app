import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from './api';
import selectedCardsSlice from './selectedCardsSlice';
import localStorageReducer from './localStorageSlice';

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    selectedCards: selectedCardsSlice,
    localStorage: localStorageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
