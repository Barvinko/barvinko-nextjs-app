import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchList } from './SearchList';
import { useRouter, useParams } from 'next/navigation';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '@store/query/api';
import localStorageReducer from '@store/localStorageSlice';
import selectedCardsReducer from '@store/selectedCardsSlice';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

const createTestStore = () => {
  return configureStore({
    reducer: {
      [tmdbApi.reducerPath]: tmdbApi.reducer,
      localStorage: localStorageReducer,
      selectedCards: selectedCardsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tmdbApi.middleware),
  });
};

const renderWithStore = (ui: React.ReactNode, testStore = createTestStore()) =>
  render(<Provider store={testStore}>{ui}</Provider>);

describe('SearchList', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useParams as jest.Mock).mockReturnValue({ page: '1' });
  });

  it('renders spinner when loading', () => {
    renderWithStore(<SearchList />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders error message when error or no results', async () => {
    server.use(
      http.get('https://api.themoviedb.org/3/movie/popular', () => {
        return HttpResponse.json({
          page: 1,
          results: [],
          total_pages: 0,
          total_results: 0,
        });
      })
    );

    renderWithStore(<SearchList />);

    await waitFor(
      () => {
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    expect(screen.getByText('Nothing Found')).toBeInTheDocument();
  });

  it('renders CardList and pagination when data is present', async () => {
    renderWithStore(<SearchList />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    expect(screen.getAllByText(/Demon Slayer/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Lord of the Rings/i)[0]).toBeInTheDocument();

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('calls router.push on page change', async () => {
    renderWithStore(<SearchList />);

    await waitFor(
      () => {
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const nextBtn = screen.getByText('>');
    fireEvent.click(nextBtn);

    expect(mockPush).toHaveBeenCalled();
  });

  it('dispatches setSearchName and router.push on search', async () => {
    const testStore = createTestStore();
    renderWithStore(<SearchList />, testStore);

    await waitFor(
      () => {
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const searchInput = screen.getByPlaceholderText('Name...');
    fireEvent.change(searchInput, { target: { value: 'Lord' } });

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(mockPush).toHaveBeenCalledWith('/page/1');

    const state = testStore.getState();
    expect(state.localStorage.searchName).toBe('Lord');
  });

  it('applies selected class when selectedCards is not empty', async () => {
    global.URL.createObjectURL = jest.fn(() => 'mocked-url');

    const testStore = configureStore({
      reducer: {
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        localStorage: localStorageReducer,
        selectedCards: selectedCardsReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tmdbApi.middleware),
      preloadedState: {
        localStorage: { searchName: '' },
        selectedCards: {
          selectedCards: [
            {
              id: 1,
              title: 'Example 1',
              poster_path: '',
              overview: '',
              vote_average: 0,
            },
            {
              id: 2,
              title: 'Example 2',
              poster_path: '',
              overview: '',
              vote_average: 0,
            },
          ],
        },
      },
    });

    const { container } = renderWithStore(<SearchList />, testStore);

    await waitFor(
      () => {
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    expect(
      container.querySelector('[class*="searchList_selected"]')
    ).toBeInTheDocument();
  });

  it('renders error message when API returns error', async () => {
    server.use(
      http.get('https://api.themoviedb.org/3/movie/popular', () => {
        return HttpResponse.json(
          { status_message: 'Internal Server Error' },
          { status: 500 }
        );
      })
    );

    renderWithStore(<SearchList />);

    await waitFor(
      () => {
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    expect(screen.getByText('Nothing Found')).toBeInTheDocument();
  });

  it('searches movies when search query is provided', async () => {
    const testStore = createTestStore();
    renderWithStore(<SearchList />, testStore);

    await waitFor(
      () => {
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const searchInput = screen.getByPlaceholderText('Name...');
    fireEvent.change(searchInput, { target: { value: 'Slayer' } });

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(mockPush).toHaveBeenCalledWith('/page/1');

    await waitFor(
      () => {
        expect(screen.getAllByText(/Demon Slayer/i)[0]).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
