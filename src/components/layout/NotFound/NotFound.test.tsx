import { render, screen } from '@testing-library/react';
import { NotFound } from './NotFound';

test('renders NotFound component', () => {
  render(<NotFound />);
  expect(screen.getByText('404')).toBeInTheDocument();
  expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  expect(screen.getByText('Go to Home')).toBeInTheDocument();
});
