// src/components/SearchList/SearchList.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchList } from './SearchList';
import { useRouter, useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useGetMoviesQuery } from '@store/query/api';
import { Movie } from 'tmdb-ts';
import { mockPopularMovies } from '@/mocks/mockDate';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock('@store/query/api', () => ({
  useGetMoviesQuery: jest.fn(),
}));
jest.mock('./Search/Search', () => ({
  Search: ({
    nameRequest,
  }: {
    nameRequest: (a: string, b: number) => void;
  }) => <button onClick={() => nameRequest('test', 1)}>SearchBtn</button>,
}));
jest.mock('./CardList/CardList', () => ({
  CardList: ({ dataCharacters }: { dataCharacters: Movie[] }) => (
    <div>
      {dataCharacters.map((c: Movie) => (
        <div key={c.id}>{c.title}</div>
      ))}
    </div>
  ),
}));
jest.mock('./Store/Store', () => ({
  Store: () => <div>StoreComponent</div>,
}));

describe('SearchList', () => {
  const mockPush = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (
      useDispatch as unknown as jest.MockedFunction<typeof useDispatch>
    ).mockReturnValue(mockDispatch);
    (useParams as jest.Mock).mockReturnValue({ page: '2' });

    (
      useSelector as unknown as jest.MockedFunction<typeof useSelector>
    ).mockImplementation((cb) =>
      cb({
        localStorage: { searchName: '' },
        selectedCards: { selectedCards: [] },
      })
    );

    (useGetMoviesQuery as jest.Mock).mockReturnValue({
      data: mockPopularMovies,
      error: undefined,
      isFetching: false,
    });
  });

  test('renders spinner when loading', () => {
    (useGetMoviesQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isFetching: true,
    });

    render(<SearchList />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders error message when error or no results', () => {
    (useGetMoviesQuery as jest.Mock).mockReturnValue({
      data: { results: [] },
      error: undefined,
      isFetching: false,
    });

    render(<SearchList />);
    expect(screen.getByText('Nothing Found')).toBeInTheDocument();
  });

  it('renders CardList and pagination when data is present', () => {
    render(<SearchList />);
    expect(screen.getByText(/Slayer/)).toBeInTheDocument();
    expect(screen.getByText(/Lord/)).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('calls router.push on page change', () => {
    render(<SearchList />);
    const nextBtn = screen.getByText('>');
    fireEvent.click(nextBtn);
    expect(mockPush).toHaveBeenCalled();
  });

  it('dispatches setSearchName and router.push on search', () => {
    render(<SearchList />);
    fireEvent.click(screen.getByText('SearchBtn'));
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('/page/1');
  });

  it('applies selected class when selectedCards is not empty', () => {
    (
      useSelector as unknown as jest.MockedFunction<typeof useSelector>
    ).mockImplementation((cb) =>
      cb({
        localStorage: { searchName: '' },
        selectedCards: { selectedCards: [1, 2] },
      })
    );

    const { container } = render(<SearchList />);
    expect(
      container.querySelector('[class*="searchList_selected"]')
    ).toBeInTheDocument();
  });
});
