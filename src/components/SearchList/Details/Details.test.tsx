import { screen, fireEvent } from '@testing-library/react';
import { Details } from './Details';
import { useRouter, useParams } from 'next/navigation';
import { renderWithStore } from '@utilities/renderWithStore';
import { waitForWrap } from '@utilities/test-utility';
import { mockErrorResponse } from '@utilities/test-utility';
import { mockPopularMoviesTitle } from '@/mocks/mockDate';
import { API_URLS } from '@/constants/URLs';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

describe('Details', () => {
  const mockPush = jest.fn();
  const mockBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      back: mockBack,
    });
    (useParams as jest.Mock).mockReturnValue({ page: '1', id: '1' });
  });

  it('should handle invalid id parameter', () => {
    (useParams as jest.Mock).mockReturnValue({
      page: undefined,
      id: undefined,
    });

    renderWithStore(<Details />);

    expect(useParams).toHaveBeenCalled();
  });

  it('renders Details component and fetches character data', async () => {
    renderWithStore(<Details />);

    await waitForWrap();

    expect(
      await screen.findByText(mockPopularMoviesTitle[0])
    ).toBeInTheDocument();
  });

  it('displays error message if character data is not available', async () => {
    mockErrorResponse(API_URLS.MOVIE_ID);

    renderWithStore(<Details />);

    expect(
      await screen.findByText('No details available.')
    ).toBeInTheDocument();
  });

  it('should call router.back() when close button is clicked', async () => {
    renderWithStore(<Details />);

    const closeButton = await screen.findByText('✕');
    fireEvent.click(closeButton);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
