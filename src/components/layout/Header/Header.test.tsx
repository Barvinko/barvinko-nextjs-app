import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Header } from './Header';
import { useRouter, useParams } from 'next/navigation';
import { ThemeProvider } from '@components/providers/ThemeProvider/ThemeProvider';
import { renderWithStore } from '@utilities/renderWithStore';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

describe('Header Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useParams as jest.Mock).mockReturnValue({ page: '1' });

    renderWithStore(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );
  });

  it('renders Header component', () => {
    expect(screen.getByText('TMDB')).toBeInTheDocument();
  });

  it('toggles theme when button is clicked', () => {
    const button = screen.getByRole('button');
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByTestId('sun-icon')).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });

  it('click on header link and go to page', async () => {
    fireEvent.click(screen.getByText('TMDB'));
    expect(mockPush).toHaveBeenCalled();

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/page/1');
    });
  });
});
