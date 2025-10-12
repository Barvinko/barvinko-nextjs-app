import { render, screen } from '@testing-library/react';
import { ErrorBoundaryComponent } from './ErrorBoundaryComponent';
import { ThemeContext } from '@store/ThemeContext';

describe('ErrorBoundaryComponent', () => {
  it('renders correctly with theme and content', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: jest.fn() }}>
        <ErrorBoundaryComponent />
      </ThemeContext.Provider>
    );

    const article = screen.getByRole('article');
    expect(article).toHaveClass('body', 'errorBoundary', 'dark');

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText('Please try again.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reload/i })).toBeInTheDocument();
  });
});
