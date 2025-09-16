import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';

jest.mock('@components/layout/Header/Header', () => ({
  Header: () => <div data-testid="header" />,
}));

describe('Layout component', () => {
  it('renders Header, Main, and children', () => {
    render(
      <Layout>
        <div data-testid="child">Child Content</div>
      </Layout>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
