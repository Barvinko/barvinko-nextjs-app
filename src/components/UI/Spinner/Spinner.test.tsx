import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

test('renders Spinner component', () => {
  render(<Spinner />);
  expect(screen.getByTestId('spinner')).toBeInTheDocument();
});
