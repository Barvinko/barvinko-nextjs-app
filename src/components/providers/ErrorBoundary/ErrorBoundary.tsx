import { Component, ReactNode, ErrorInfo } from 'react';
import { ErrorBoundaryComponent } from './ErrorBoundaryComponent/ErrorBoundaryComponent';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ hasError: true });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <ErrorBoundaryComponent />;
    }

    return this.props.children;
  }
}
