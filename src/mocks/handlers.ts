import { http, HttpResponse } from 'msw';
import { mockPopularMovies, mockMovieDetails } from './mockDate';

export const handlers = [
  http.get('/1/movie/popular', ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') ?? '1';

    return HttpResponse.json({
      ...mockPopularMovies,
      page: Number(page),
    });
  }),

  http.get('/2/search/movie', ({ request }) => {
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

  http.get('/1/movie/:id', ({ params }) => {
    const { id } = params;
    if (Number(id) === mockMovieDetails.id) {
      return HttpResponse.json(mockMovieDetails);
    }
    return HttpResponse.json(
      { message: 'Movie not found', code: 'MOVIE_NOT_FOUND' },
      { status: 404 }
    );
  }),

  http.get('/1/movie/error', () => {
    return HttpResponse.json(
      { message: 'Internal Server Error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }),

  http.get('/1/movie/slow', async () => {
    await new Promise((resolve) => setTimeout(resolve, 2500));
    return HttpResponse.json({
      page: 1,
      results: [
        {
          id: 201,
          title: 'Slow Movie',
          overview: 'Loaded with delay...',
          vote_average: 5.5,
        },
      ],
      total_pages: 1,
      total_results: 1,
    });
  }),
];
