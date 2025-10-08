import { screen, fireEvent } from '@testing-library/react';
import { Search } from './Search';
import { renderWithStore } from '@utilities/renderWithStore';

describe('SearchList', () => {
  it('renders Search component and handles input', () => {
    const mockNameRequest = jest.fn();
    renderWithStore(<Search nameRequest={mockNameRequest} />);

    const input = screen.getByPlaceholderText('Name...');
    fireEvent.change(input, { target: { value: 'Slayer' } });
    expect(input).toHaveValue('Slayer');

    const button = screen.getByText('Search');
    fireEvent.click(button);
    expect(mockNameRequest).toHaveBeenCalledWith('Slayer', 1);
  });

  it('displays error message for invalid input', () => {
    renderWithStore(<Search nameRequest={jest.fn()} />);

    const input = screen.getByPlaceholderText('Name...');
    fireEvent.change(input, { target: { value: 'Slayer@' } });
    expect(
      screen.getByText(
        'Only letters, numbers, spaces, and hyphens are allowed.'
      )
    ).toBeInTheDocument();
  });
});
