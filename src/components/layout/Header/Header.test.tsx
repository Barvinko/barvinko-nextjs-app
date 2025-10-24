import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';
import { ThemeProvider } from '@components/providers/ThemeProvider/ThemeProvider';

describe('Header Component', () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );
  });

  test('renders Header component', () => {
    expect(screen.getByText('TMDB')).toBeInTheDocument();
  });

  test('toggles theme when button is clicked', () => {
    const button = screen.getByRole('button');
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByTestId('sun-icon')).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });
});
