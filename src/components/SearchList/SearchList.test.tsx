import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { SearchList } from './SearchList';
import { useRouter, useParams } from 'next/navigation';
import {
  createTestStore,
  mockEmptyResponse,
  mockErrorResponse,
  waitForWrap,
} from '@utilities/test-utility';
import { renderWithStore } from '@utilities/renderWithStore';
import { cardMock } from '@/mocks/mockDate';

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

  it('renders spinner when loading', () => {
    renderWithStore(<SearchList />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
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

    expect(screen.getAllByText(/Demon Slayer/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Lord of the Rings/i)[0]).toBeInTheDocument();

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

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

    const searchInput = screen.getByPlaceholderText('Name...');
    fireEvent.change(searchInput, { target: { value: 'Lord' } });

    fireEvent.click(screen.getByText('Search'));

    expect(mockPush).toHaveBeenCalledWith('/page/1');

    const state = testStore.getState();
    expect(state.localStorage.searchName).toBe('Lord');
  });

  it('applies selected class when selectedCards is not empty', async () => {
    global.URL.createObjectURL = jest.fn(() => 'mocked-url');

    const testStore = createTestStore({
      localStorage: { searchName: '' },
      selectedCards: {
        selectedCards: [cardMock(1), cardMock(2)],
      },
    });

    const { container } = renderWithStore(<SearchList />, testStore);

    await waitForWrap();

    expect(
      container.querySelector('[class*="searchList_selected"]')
    ).toBeInTheDocument();
  });

  it('renders error message when API returns error', async () => {
    mockErrorResponse();
    renderWithStore(<SearchList />);

    await waitForWrap();

    expect(screen.getByText('Nothing Found')).toBeInTheDocument();
  });

  it('searches movies when search query is provided', async () => {
    const testStore = createTestStore();
    renderWithStore(<SearchList />, testStore);

    await waitForWrap();

    const searchInput = screen.getByPlaceholderText('Name...');
    fireEvent.change(searchInput, { target: { value: 'Slayer' } });

    fireEvent.click(screen.getByText('Search'));

    expect(mockPush).toHaveBeenCalledWith('/page/1');

    await waitForWrap('Demon Slayer');
  });
});
