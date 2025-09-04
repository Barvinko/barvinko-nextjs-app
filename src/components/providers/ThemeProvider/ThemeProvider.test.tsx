import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider';
import { ThemeContext } from '@store/ThemeContext';
import { useContext } from 'react';
import { describe, it, expect } from 'vitest';

const TestComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  it('should provide default theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-value').textContent).toBe('dark');
  });

  it('should toggle theme', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByText('Toggle Theme');
    await fireEvent.click(button);
    expect(screen.getByTestId('theme-value').textContent).toBe('light');

    await fireEvent.click(button);
    expect(screen.getByTestId('theme-value').textContent).toBe('dark');
  });
});
