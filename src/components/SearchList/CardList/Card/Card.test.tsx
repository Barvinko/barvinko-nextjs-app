import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import { Card } from './Card';
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

const mockCharacter: Character = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  birth_year: '19BBY',
  gender: 'male',
  url: 'https://swapi.dev/api/people/1/',
};

const mockRouter = createMockRouter({ query: { page: '1' } });
const RouterContext = createContext<NextRouter>(mockRouter);

beforeEach(() => {
  vi.clearAllMocks();
  (useRouter as Mock).mockReturnValue(mockRouter);
});

test('renders Card component with character name', () => {
  render(
    <RouterContext.Provider value={mockRouter}>
      <Provider store={store}>
        <Card {...mockCharacter} />
      </Provider>
    </RouterContext.Provider>
  );

  expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
});

test('navigates to details page on click', () => {
  render(
    <RouterContext.Provider value={mockRouter}>
      <Provider store={store}>
        <Card {...mockCharacter} />
      </Provider>
    </RouterContext.Provider>
  );

  fireEvent.click(screen.getByText('Luke Skywalker'));
  expect(mockRouter.push).toHaveBeenCalledWith('/page/1/details/1');
});

test('checkbox toggles state on click', () => {
  render(
    <RouterContext.Provider value={mockRouter}>
      <Provider store={store}>
        <Card {...mockCharacter} />
      </Provider>
    </RouterContext.Provider>
  );

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();

  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
});
