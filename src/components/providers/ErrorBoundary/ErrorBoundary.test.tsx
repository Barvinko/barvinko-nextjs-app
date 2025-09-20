import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { Component, ReactNode } from 'react';

class ErrorThrowingComponent extends Component {
  componentDidMount() {
    throw new Error('Test error');
  }

  render(): ReactNode {
    return <div>Error Throwing Component</div>;
  }
}

describe('ErrorBoundary', () => {
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
});
