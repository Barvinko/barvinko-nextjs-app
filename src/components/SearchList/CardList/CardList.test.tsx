import { screen } from '@testing-library/react';
import { CardList } from './CardList';
import { renderWithStore } from '@utilities/renderWithStore';
import { mockPopularMovies, mockPopularMoviesTitle } from '@/mocks/mockDate';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders CardList component with characters', () => {
  renderWithStore(<CardList dataCharacters={mockPopularMovies.results} />);

  expect(
    screen.getAllByText(new RegExp(mockPopularMoviesTitle[0], 'i'))[0]
  ).toBeInTheDocument();
  expect(
    screen.getAllByText(new RegExp(mockPopularMoviesTitle[1], 'i'))[0]
  ).toBeInTheDocument();
});
