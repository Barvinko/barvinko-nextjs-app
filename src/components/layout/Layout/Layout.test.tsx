import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';
import { vi } from 'vitest'; // Import vi from vitest

vi.mock('@components/Header/Header', () => ({
  Header: () => <div data-testid="header" />,
}));

vi.mock('@components/Main/Main', () => ({
  Main: () => <div data-testid="main" />,
}));

describe('Layout component', () => {
  it('renders Header, Main, and children', () => {
    render(
      <Layout>
        <div data-testid="child">Child Content</div>
      </Layout>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('main')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
