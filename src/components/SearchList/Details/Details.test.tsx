import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Details } from './Details';
import { useRouter, useParams } from 'next/navigation';
import { renderWithStore } from '@utilities/renderWithStore';
import {
  waitForWrap,
  mockErrorResponse,
  mockCustomResponse,
} from '@utilities/test-utility';
import {
  mockPopularMoviesTitle,
  mockMovieVideos,
  mockMovieDetails,
} from '@/mocks/mockDate';
import { API_URLS } from '@/constants/URLs';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

describe('Details', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
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

    expect(mockPush).toHaveBeenCalledTimes(1);
  });

  it('should display "-" when origin_country is empty or missing', async () => {
    mockCustomResponse(API_URLS.MOVIE_ID, {
      ...mockMovieDetails,
      origin_country: [],
      overview: '',
    });
    renderWithStore(<Details />);

    await waitForWrap();

    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('Overview not found')).toBeInTheDocument();
  });

  describe('handlePlayTrailer', () => {
    let windowOpenSpy: jest.SpyInstance;
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
      windowOpenSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
      consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
    });

    afterEach(() => {
      windowOpenSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });

    it('must send to link of trailer if fetching trailer true', async () => {
      renderWithStore(<Details />);

      await waitForWrap();

      const playButton = await screen.findByText('Play Trailer');

      fireEvent.click(playButton);

      await waitFor(() => {
        expect(windowOpenSpy).toHaveBeenCalledWith(
          `https://www.youtube.com/watch?v=${mockMovieVideos.results[1].key}`,
          '_blank'
        );
      });
    });

    it('must log an error if fetching trailer fails', async () => {
      mockErrorResponse(API_URLS.MOVIE_VIDEOS);
      renderWithStore(<Details />);

      await waitForWrap();

      const playButton = await screen.findByText('Play Trailer');

      fireEvent.click(playButton);

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalled();
      });
    });

    it('must display "No Trailer Available" when no videos exist', async () => {
      mockCustomResponse(API_URLS.MOVIE_VIDEOS, { id: 1, results: [] });
      renderWithStore(<Details />);

      await waitForWrap();

      const playButton = await screen.findByText('Play Trailer');
      fireEvent.click(playButton);

      await waitFor(() => {
        expect(screen.getByText('No Trailer Available')).toBeInTheDocument();
      });
    });
  });
});
