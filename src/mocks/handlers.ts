import { http, HttpResponse } from 'msw';
import { mockPopularMovies, mockMovieDetails } from './mockDate';

const BASE_URL = 'https://api.themoviedb.org/3';
export const MOVIE_POPULAR_URL = `${BASE_URL}/movie/popular`;

export const handlers = [
  http.get(MOVIE_POPULAR_URL, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') ?? '1';

    return HttpResponse.json({
      ...mockPopularMovies,
      page: Number(page),
    });
  }),

  http.get(`${BASE_URL}/search/movie`, ({ request }) => {
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

  http.get(`${BASE_URL}/movie/:id`, ({ params }) => {
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
