import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '@store/query/api';
import { server } from '@/mocks/server';
import { http, HttpResponse, DefaultBodyType } from 'msw';
import { screen, waitFor } from '@testing-library/react';
import localStorageReducer from '@store/localStorageSlice';
import selectedCardsReducer from '@store/selectedCardsSlice';
import { API_URLS } from '@/constants/URLs';

export interface RootState {
  [tmdbApi.reducerPath]: ReturnType<typeof tmdbApi.reducer>;
  localStorage: ReturnType<typeof localStorageReducer>;
  selectedCards: ReturnType<typeof selectedCardsReducer>;
}

interface CreateTestStoreOptions {
  localStorage?: Partial<ReturnType<typeof localStorageReducer>>;
  selectedCards?: Partial<ReturnType<typeof selectedCardsReducer>>;
}

export const createTestStore = (preloadedState?: CreateTestStoreOptions) => {
  return configureStore({
    reducer: {
      [tmdbApi.reducerPath]: tmdbApi.reducer,
      localStorage: localStorageReducer,
      selectedCards: selectedCardsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tmdbApi.middleware),
    preloadedState: preloadedState
      ? {
          localStorage: { searchName: '', ...preloadedState.localStorage },
          selectedCards: { selectedCards: [], ...preloadedState.selectedCards },
        }
      : undefined,
  });
};

export const mockEmptyResponse = () =>
  server.use(
    http.get(API_URLS.MOVIE_POPULAR, () => {
      return HttpResponse.json({
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
      });
    })
  );

export const mockErrorResponse = (url: string) =>
  server.use(
    http.get(url, () => {
      return HttpResponse.json(
        { status_message: 'Internal Server Error' },
        { status: 500 }
      );
    })
  );

export const mockCustomResponse = (url: string, response: DefaultBodyType) =>
  server.use(
    http.get(url, () => {
      return HttpResponse.json(response);
    })
  );

export const waitForWrap = async (text?: string, time = 3000) =>
  await waitFor(
    () => {
      if (text) {
        expect(
          screen.getAllByText(new RegExp(text, 'i'))[0]
        ).toBeInTheDocument();
        return;
      }
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    },
    { timeout: time }
  );
