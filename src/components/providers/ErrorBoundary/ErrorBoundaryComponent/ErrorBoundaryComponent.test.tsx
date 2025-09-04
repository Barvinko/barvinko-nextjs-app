import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorBoundaryComponent } from './ErrorBoundaryComponent';
import { ThemeContext } from '@store/ThemeContext';

describe('ErrorBoundaryComponent', () => {
  it('renders correctly with theme and content', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: vi.fn() }}>
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

  it('calls window.location.reload on button click', () => {
    const reloadMock = vi.fn();
    vi.stubGlobal('location', { reload: reloadMock });

    render(
      <ThemeContext.Provider value={{ theme: 'light', toggleTheme: vi.fn() }}>
        <ErrorBoundaryComponent />
      </ThemeContext.Provider>
    );

    const button = screen.getByRole('button', { name: /reload/i });
    fireEvent.click(button);

    expect(reloadMock).toHaveBeenCalled();
  });
});
