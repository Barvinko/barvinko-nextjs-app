import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';
import { ThemeProvider } from '@components/ThemeProvider/ThemeProvider';

test('renders Header component', () => {
  render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
  expect(screen.getByText('The Characters of StarWars')).toBeInTheDocument();
});

test('toggles theme when button is clicked', () => {
  render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );

  const button = screen.getByRole('button');
  expect(button).toHaveTextContent('🌙');

  fireEvent.click(button);
  expect(button).toHaveTextContent('☀️');

  fireEvent.click(button);
  expect(button).toHaveTextContent('🌙');
});
