import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import { CardList } from './CardList';
import { Character } from '@/src/types/types';
import { vi, Mock } from 'vitest'; // Import Mock
import { useRouter } from 'next/router';
import { NextRouter } from 'next/router'; // Import NextRouter
import { createContext } from 'react';

const createMockRouter = (overrides: Partial<NextRouter>): NextRouter => ({
  route: '',
  pathname: '',
  query: {},
  asPath: '',
  basePath: '',
  push: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  prefetch: vi.fn().mockResolvedValue(undefined),
  beforePopState: vi.fn(),
  isFallback: false,
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
  isReady: true,
  isPreview: false,
  isLocaleDomain: false,
  ...overrides,
});

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const mockCharacters: Character[] = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    birth_year: '19BBY',
    gender: 'male',
    url: 'https://swapi.dev/api/people/1/',
  },
  {
    name: 'Darth Vader',
    height: '202',
    mass: '136',
    birth_year: '41.9BBY',
    gender: 'male',
    url: 'https://swapi.dev/api/people/4/',
  },
];

const mockRouter = createMockRouter({ query: { page: '1' } });
const RouterContext = createContext<NextRouter>(mockRouter);

beforeEach(() => {
  vi.clearAllMocks();
  (useRouter as Mock).mockReturnValue(mockRouter);
});

test('renders CardList component with characters', () => {
  render(
    <RouterContext.Provider value={mockRouter}>
      <Provider store={store}>
        <CardList dataCharacters={mockCharacters} />
      </Provider>
    </RouterContext.Provider>
  );
  expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  expect(screen.getByText('Darth Vader')).toBeInTheDocument();
});
