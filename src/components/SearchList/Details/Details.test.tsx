import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import { Details } from './Details';
import { vi } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const server = setupServer(
  http.get('https://swapi.py4e.com/api/people/:id', async ({ params }) => {
    if (params.id === '1') {
      return HttpResponse.json({
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        gender: 'male',
        height: '172',
        mass: '77',
      });
    }
    return HttpResponse.json({ detail: 'Not found' }, { status: 404 });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders Details component and fetches character data', async () => {
  vi.mocked(useRouter).mockReturnValue({
    query: { page: '1', id: '1' },
    push: vi.fn(),
    route: '',
    pathname: '',
    asPath: '',
    basePath: '',
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
  });

  render(
    <Provider store={store}>
      <Details />
    </Provider>
  );

  expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
  expect(screen.getByText('Birth Year: 19BBY')).toBeInTheDocument();
  expect(screen.getByText('Gender: male')).toBeInTheDocument();
  expect(screen.getByText('Height: 172')).toBeInTheDocument();
  expect(screen.getByText('Mass: 77')).toBeInTheDocument();
});

test('displays error message if character data is not available', async () => {
  server.use(
    http.get('https://swapi.py4e.com/api/people/:id', async () =>
      HttpResponse.json({ detail: 'Not found' }, { status: 404 })
    )
  );

  vi.mocked(useRouter).mockReturnValue({
    query: { page: '1', id: '2' },
    push: vi.fn(),
    route: '',
    pathname: '',
    asPath: '',
    basePath: '',
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
  });

  render(
    <Provider store={store}>
      <Details />
    </Provider>
  );

  expect(
    await screen.findByText('No character details available.')
  ).toBeInTheDocument();
});

test('closes modal and navigates to page on handleClose', () => {
  const push = vi.fn();

  vi.mocked(useRouter).mockReturnValue({
    query: { page: '1', id: '1' },
    push,
    route: '',
    pathname: '',
    asPath: '',
    basePath: '',
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
  });

  render(
    <Provider store={store}>
      <Details />
    </Provider>
  );

  fireEvent.click(screen.getByText('Close'));

  expect(push).toHaveBeenCalledWith('/page/1');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
