import { http, HttpResponse } from 'msw';
import { API_URLS } from '../constants/URLs';
import { mockPopularMovies, mockMovieDetails } from './mockDate';

export const handlers = [
  http.get(API_URLS.MOVIE_POPULAR, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') ?? '1';

    return HttpResponse.json({
      ...mockPopularMovies,
      page: Number(page),
    });
  }),

  http.get(API_URLS.MOVIE_SEARCH, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('query') ?? '';

    return HttpResponse.json({
      page: 1,
      results: mockPopularMovies.results.filter((m) =>
        m.title.toLowerCase().includes(query.toLowerCase())
      ),
      total_pages: 1,
      total_results: 2,
    });
  }),

  http.get(API_URLS.MOVIE_ID, ({ params }) => {
    const { id } = params;
    if (Number(id) === mockMovieDetails.id) {
      return HttpResponse.json(mockMovieDetails);
    }
    return HttpResponse.json(
      { status_message: 'The resource you requested could not be found.' },
      { status: 404 }
    );
  }),
];
