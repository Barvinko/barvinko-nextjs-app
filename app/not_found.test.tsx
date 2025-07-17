import { render, screen } from '@testing-library/react';
import NotFoundPage from './not_found';
import { vi } from 'vitest';

vi.mock('@components/Header/Header', () => ({
  Header: () => <div data-testid="header" />,
}));

vi.mock('@components/NotFound/NotFound', () => ({
  NotFound: () => <div data-testid="not-found" />,
}));

describe('NotFoundPage component', () => {
  it('renders Header and NotFound components', () => {
    render(<NotFoundPage />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
});
