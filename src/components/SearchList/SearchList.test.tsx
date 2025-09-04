import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import { Main } from './Main';
import { vi } from 'vitest';
import { useGetCharactersQuery } from '@store/api';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@store/api', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('@store/api');
  return {
    ...actual,
    useGetCharactersQuery: vi.fn(),
  };
});

test('renders Main component', () => {
  vi.mocked(useRouter).mockReturnValue({
    query: { page: '1' },
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

  (useGetCharactersQuery as jest.Mock).mockReturnValue({
    data: { results: [] },
    isFetching: false,
    error: null,
  });

  render(
    <Provider store={store}>
      <Main />
    </Provider>
  );
  expect(screen.getByText('Nothing Found')).toBeInTheDocument();
});

test('handles search and displays results', async () => {
  vi.mocked(useRouter).mockReturnValue({
    query: { page: '1' },
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

  (useGetCharactersQuery as jest.Mock).mockReturnValue({
    data: {
      results: [
        { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
      ],
    },
    isFetching: false,
    error: null,
  });

  render(
    <Provider store={store}>
      <Main />
    </Provider>
  );

  const input = screen.getByPlaceholderText('Name...');
  fireEvent.change(input, { target: { value: 'Luke' } });
  const button = screen.getByText('Search');
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });
});

test('displays error message on request error', async () => {
  vi.mocked(useRouter).mockReturnValue({
    query: { page: '1' },
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

  (useGetCharactersQuery as jest.Mock).mockReturnValue({
    data: null,
    isFetching: false,
    error: { status: 404 },
  });

  render(
    <Provider store={store}>
      <Main />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByText('Nothing Found')).toBeInTheDocument();
  });
});

test('handles pagination', async () => {
  const push = vi.fn();
  vi.mocked(useRouter).mockReturnValue({
    query: { page: '1' },
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

  (useGetCharactersQuery as jest.Mock).mockReturnValue({
    data: {
      results: [
        { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
      ],
      count: 20,
    },
    isFetching: false,
    error: null,
  });

  render(
    <Provider store={store}>
      <Main />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  const nextButton = screen.getByText('Next');
  fireEvent.click(nextButton);

  await waitFor(() => {
    expect(push).toHaveBeenCalledWith('/page/2');
  });
});

test('displays loading spinner while fetching data', () => {
  vi.mocked(useRouter).mockReturnValue({
    query: { page: '1' },
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

  (useGetCharactersQuery as jest.Mock).mockReturnValue({
    data: null,
    isFetching: true,
    error: null,
  });

  render(
    <Provider store={store}>
      <Main />
    </Provider>
  );

  expect(screen.getByTestId('spinner')).toBeInTheDocument();
});
