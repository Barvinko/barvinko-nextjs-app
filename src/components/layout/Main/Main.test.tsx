import { render, screen } from '@testing-library/react';
import { Main } from './Main';

jest.mock('@components/SearchList/SearchList', () => ({
  SearchList: () => <div data-testid="SearchList" />,
}));

describe('Main component', () => {
  it('renders Main', () => {
    render(<Main />);

    expect(screen.getByTestId('SearchList')).toBeInTheDocument();
  });
});
