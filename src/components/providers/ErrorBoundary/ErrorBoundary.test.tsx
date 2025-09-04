import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { Component, ReactNode } from 'react';
import { vi } from 'vitest';

class ErrorThrowingComponent extends Component {
  componentDidMount() {
    throw new Error('Test error');
  }

  render(): ReactNode {
    return <div>Error Throwing Component</div>;
  }
}

test('renders ErrorBoundary component', () => {
  const { getByText } = render(
    <ErrorBoundary>
      <div>Child Component</div>
    </ErrorBoundary>
  );
  expect(getByText('Child Component')).toBeInTheDocument();
});

test('catches error and updates state', () => {
  render(
    <ErrorBoundary>
      <ErrorThrowingComponent />
    </ErrorBoundary>
  );

  expect(screen.getByText('Oops!')).toBeInTheDocument();
  expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  expect(screen.getByText('Please try again.')).toBeInTheDocument();
});

test('reloads the page on button click', () => {
  const originalLocation = window.location;
  Object.defineProperty(window, 'location', {
    value: { reload: vi.fn() },
    writable: true,
  });

  render(
    <ErrorBoundary>
      <ErrorThrowingComponent />
    </ErrorBoundary>
  );

  const reloadButton = screen.getByText('Reload');
  reloadButton.click();
  expect(window.location.reload).toHaveBeenCalled();

  Object.defineProperty(window, 'location', {
    value: originalLocation,
    writable: true,
  });
});
