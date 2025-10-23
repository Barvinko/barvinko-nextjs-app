import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Search } from './Search';
import { renderWithStore } from '@utilities/renderWithStore';

describe('Search', () => {
  it('renders Search component and handles input', () => {
    const mockNameRequest = jest.fn();
    renderWithStore(<Search nameRequest={mockNameRequest} />);

    const input = screen.getByPlaceholderText('Search movie...');
    fireEvent.change(input, { target: { value: 'Slayer' } });
    expect(input).toHaveValue('Slayer');

    const button = screen.getByText('Search');
    fireEvent.click(button);
    waitFor(() => {
      expect(mockNameRequest).toHaveBeenCalledWith('Slayer');
    });
  });
});
