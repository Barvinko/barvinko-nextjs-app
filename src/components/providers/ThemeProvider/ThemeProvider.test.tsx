import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider';
import { ThemeContext } from '@store/ThemeContext';
import { useContext } from 'react';

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
  beforeEach(() => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
  });

  test('should provide default theme', () => {
    expect(screen.getByTestId('theme-value').textContent).toBe('dark');
  });

  test('should toggle theme', async () => {
    const button = screen.getByText('Toggle Theme');
    await fireEvent.click(button);
    expect(screen.getByTestId('theme-value').textContent).toBe('light');

    await fireEvent.click(button);
    expect(screen.getByTestId('theme-value').textContent).toBe('dark');
  });
});
