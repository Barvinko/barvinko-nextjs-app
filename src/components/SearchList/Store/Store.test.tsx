import { screen, fireEvent } from '@testing-library/react';
import { Store } from './Store';
import { renderWithStore } from '@utilities/renderWithStore';
import { createTestStore } from '@utilities/test-utility';
import { unselectCard } from '@store/selectedCardsSlice';
import { mockPopularMovies } from '@/mocks/mockDate';

describe('Store Component', () => {
  beforeEach(() => {
    URL.createObjectURL = jest.fn(() => 'blob:mock-url');
    URL.revokeObjectURL = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when no cards are selected', () => {
    renderWithStore(<Store />);

    expect(
      screen.queryByText(/Characters are selected/i)
    ).not.toBeInTheDocument();
  });

  it('should render when cards are selected', () => {
    const store = createTestStore({
      selectedCards: {
        selectedCards: [mockPopularMovies.results[0]],
      },
    });

    renderWithStore(<Store />, store);

    expect(screen.getByText('Selected: 1')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /unselect all/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /download/i })).toBeInTheDocument();
  });

  it('should display correct count for multiple selected cards', () => {
    const store = createTestStore({
      selectedCards: {
        selectedCards: mockPopularMovies.results,
      },
    });

    renderWithStore(<Store />, store);

    expect(screen.getByText('Selected: 2')).toBeInTheDocument();
  });

  it('should dispatch unselectCard for all selected cards when clicking Unselect all', () => {
    const store = createTestStore({
      selectedCards: {
        selectedCards: mockPopularMovies.results,
      },
    });

    const dispatchSpy = jest.spyOn(store, 'dispatch');

    renderWithStore(<Store />, store);

    const unselectButton = screen.getByRole('button', {
      name: /unselect all/i,
    });
    fireEvent.click(unselectButton);

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenCalledWith(
      unselectCard(mockPopularMovies.results[0].id)
    );
    expect(dispatchSpy).toHaveBeenCalledWith(
      unselectCard(mockPopularMovies.results[1].id)
    );
  });
});
