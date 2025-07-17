import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import { vi, Mock } from 'vitest';
import { useRouter } from 'next/router';
import { NextRouter } from 'next/router';
import { createContext } from 'react';
import Page from './page';

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

const mockRouter = createMockRouter({ query: { page: '1', id: '1' } });
const RouterContext = createContext<NextRouter>(mockRouter);

beforeEach(() => {
  vi.clearAllMocks();
  (useRouter as Mock).mockReturnValue(mockRouter);
});

test('renders Page component and opens modal when id is present', () => {
  render(
    <RouterContext.Provider value={mockRouter}>
      <Provider store={store}>
        <Page />
      </Provider>
    </RouterContext.Provider>
  );

  expect(screen.getByText('Close')).toBeInTheDocument();
});

test('closes modal on handleClose', () => {
  render(
    <RouterContext.Provider value={mockRouter}>
      <Provider store={store}>
        <Page />
      </Provider>
    </RouterContext.Provider>
  );

  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  expect(mockRouter.push).toHaveBeenCalledWith('/page/1');
});

test('does not open modal when id is not present', () => {
  const mockRouterWithoutId = createMockRouter({ query: { page: '1' } });
  (useRouter as Mock).mockReturnValue(mockRouterWithoutId);

  render(
    <RouterContext.Provider value={mockRouterWithoutId}>
      <Provider store={store}>
        <Page />
      </Provider>
    </RouterContext.Provider>
  );

  expect(screen.queryByText('Close')).not.toBeInTheDocument();
});

test('modal opens and closes correctly', () => {
  render(
    <RouterContext.Provider value={mockRouter}>
      <Provider store={store}>
        <Page />
      </Provider>
    </RouterContext.Provider>
  );

  expect(screen.getByText('Close')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  expect(mockRouter.push).toHaveBeenCalledWith('/page/1');
  expect(screen.queryByText('Close')).not.toBeInTheDocument();
});

test('handleClose function works correctly', () => {
  render(
    <RouterContext.Provider value={mockRouter}>
      <Provider store={store}>
        <Page />
      </Provider>
    </RouterContext.Provider>
  );

  const closeButton = screen.getByRole('button', { name: /close/i });
  fireEvent.click(closeButton);

  expect(mockRouter.push).toHaveBeenCalledWith('/page/1');
  expect(screen.queryByText('Close')).not.toBeInTheDocument();
});
