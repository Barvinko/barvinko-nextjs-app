import { screen, fireEvent } from '@testing-library/react';
import { useRouter, useParams } from 'next/navigation';
import { Card } from './Card';
import { renderWithStore } from '@utilities/renderWithStore';
import { createTestStore } from '@utilities/test-utility';
import { mockPopularMovies, mockPopularMoviesTitle } from '@/mocks/mockDate';

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

  test('renders Card component with character name', () => {
    renderWithStore(<Card {...mockPopularMovies.results[0]} />);

    expect(
      screen.getAllByText(new RegExp(mockPopularMoviesTitle[0], 'i'))[0]
    ).toBeInTheDocument();
  });

  test('navigates to details page on click', () => {
    renderWithStore(<Card {...mockPopularMovies.results[0]} />);

    fireEvent.click(
      screen.getAllByText(new RegExp(mockPopularMoviesTitle[0], 'i'))[0]
    );
    expect(mockPush).toHaveBeenCalledWith('/page/1/details/1', {
      scroll: false,
    });
  });

  test('checkbox toggles state on click', () => {
    renderWithStore(<Card {...mockPopularMovies.results[0]} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('dispatches card', async () => {
    const store = createTestStore();
    renderWithStore(<Card {...mockPopularMovies.results[0]} />, store);
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);

    const state = store.getState();
    expect(state.selectedCards.selectedCards).toHaveLength(1);
    expect(state.selectedCards.selectedCards[0].id).toBe(1);

    fireEvent.click(checkbox);
    expect(store.getState().selectedCards.selectedCards).toHaveLength(0);
  });

  it('Card render without overview', () => {
    const movieWithoutOverview = {
      ...mockPopularMovies.results[0],
      overview: '',
    };
    renderWithStore(<Card {...movieWithoutOverview} />);

    expect(screen.getByText('No description available.')).toBeInTheDocument();
  });
});
