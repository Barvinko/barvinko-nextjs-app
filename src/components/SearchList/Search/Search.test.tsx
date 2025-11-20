import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Search } from './Search';
import { createTestStore } from '@utilities/test-utility';
import { renderWithStore } from '@utilities/renderWithStore';

describe('Search', () => {
  const mockNameRequest = jest.fn();

  it('renders Search component and handles input', () => {
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

  it.each([
    ['The Matrix', 'The Matrix'],
    [undefined, ''],
  ])(
    'initializes input correctly when localName is %s',
    (localNameValue, expectedValue) => {
      const store = createTestStore({
        localStorage: {
          searchName: localNameValue,
        },
      });

      renderWithStore(<Search nameRequest={mockNameRequest} />, store);

      const input = screen.getByPlaceholderText('Search movie...');
      expect(input).toHaveValue(expectedValue);
    }
  );
});
