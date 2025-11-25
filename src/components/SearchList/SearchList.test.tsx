import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchList } from './SearchList';
import { useRouter, useParams } from 'next/navigation';
import {
  createTestStore,
  mockEmptyResponse,
  mockErrorResponse,
  waitForWrap,
} from '@utilities/test-utility';
import { renderWithStore } from '@utilities/renderWithStore';
import { mockCustomResponse } from '@utilities/test-utility';
import { mockPopularMovies, mockPopularMoviesTitle } from '@/mocks/mockDate';
import { API_URLS } from '@/constants/URLs';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

describe('SearchList', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useParams as jest.Mock).mockReturnValue({ page: '1' });
  });

  describe('Rendering States and API Responses', () => {
    it('renders spinner when loading', () => {
      renderWithStore(<SearchList />);
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('renders error message when API returns error', async () => {
      mockErrorResponse(API_URLS.MOVIE_POPULAR);
      renderWithStore(<SearchList />);

      await waitForWrap();

      expect(screen.getByText('Nothing Found')).toBeInTheDocument();
    });

    it('renders error message when error or no results', async () => {
      mockEmptyResponse();
      renderWithStore(<SearchList />);
      await waitForWrap();

      expect(screen.getByText('Nothing Found')).toBeInTheDocument();
    });

    it('renders CardList and pagination when data is present', async () => {
      renderWithStore(<SearchList />);
      await waitForWrap();

      expect(
        screen.getAllByText(new RegExp(mockPopularMoviesTitle[0], 'i'))[0]
      ).toBeInTheDocument();
      expect(
        screen.getAllByText(new RegExp(mockPopularMoviesTitle[1], 'i'))[0]
      ).toBeInTheDocument();

      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('applies selected class when selectedCards is not empty', async () => {
      global.URL.createObjectURL = jest.fn(() => 'mocked-url');
      const testStore = createTestStore({
        localStorage: { searchName: '' },
        selectedCards: {
          selectedCards: mockPopularMovies.results,
        },
      });

      const { container } = renderWithStore(<SearchList />, testStore);
      await waitForWrap();

      expect(
        container.querySelector('[class*="searchList_selected"]')
      ).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('calls router.push on page change', async () => {
      renderWithStore(<SearchList />);
      await waitForWrap();
      fireEvent.click(screen.getByText('>'));
      expect(mockPush).toHaveBeenCalled();
    });

    it('dispatches setSearchName and router.push on search', async () => {
      const testStore = createTestStore();
      renderWithStore(<SearchList />, testStore);

      await waitForWrap();

      const searchInput = screen.getByPlaceholderText('Search movie...');
      fireEvent.change(searchInput, { target: { value: 'Lord' } });
      fireEvent.submit(screen.getByText('Search'));

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/page/1');

        const state = testStore.getState();
        expect(state.localStorage.searchName).toBe('Lord');
      });
    });

    it('searches movies when search query is provided', async () => {
      const testStore = createTestStore();
      renderWithStore(<SearchList />, testStore);

      await waitForWrap();

      const searchInput = screen.getByPlaceholderText('Search movie...');
      fireEvent.change(searchInput, { target: { value: 'Slayer' } });

      fireEvent.click(screen.getByText('Search'));

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/page/1');
        expect(
          screen.getAllByText(new RegExp('Demon Slayer', 'i'))[0]
        ).toBeInTheDocument();
      });
    });
  });

  describe('Data Rendering and Pagination Logic', () => {
    jest.mock('./CardList/CardList', () => ({
      CardList: jest.fn(() => <div data-testid="CardList" />),
    }));

    test.each([
      ['when total_pages < 8 and currentPage < 8', 5, '1', '5'],
      ['when total_pages >= 8 and currentPage < 8', 10, '1', '8'],
      ['when currentPage >= 8 (e.g., page 10)', 20, '10', '11'],
    ])(
      'calculates pagination props correctly: %s (Total: %s, Current: %s)',
      async (_, totalPages, currentPage, showLastPage) => {
        (useParams as jest.Mock).mockReturnValue({ page: currentPage });
        mockCustomResponse(API_URLS.MOVIE_POPULAR, {
          ...mockPopularMovies,
          total_pages: totalPages,
          page: currentPage,
        });

        renderWithStore(<SearchList />);
        await waitForWrap();
        expect(screen.getByRole('navigation')).toBeInTheDocument();

        const paginate = screen.getByRole('navigation');
        expect(paginate).toBeInTheDocument();
        expect(paginate).toHaveTextContent(currentPage.toString());
        expect(paginate).toHaveTextContent(showLastPage);
      }
    );

    test.each([
      ['Positive integer', '1', 1],
      ['0', '0', undefined],
      ['non-integer', 'a', undefined],
    ])('if the page is %s', async (_, pageParam, expectedPage) => {
      (useParams as jest.Mock).mockReturnValue({ page: pageParam });

      renderWithStore(<SearchList />);

      await waitForWrap();

      if (expectedPage === undefined) {
        expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
        expect(screen.getByText('Nothing Found')).toBeInTheDocument();
      } else {
        expect(screen.getByRole('navigation')).toBeInTheDocument();
      }
    });
  });
});
