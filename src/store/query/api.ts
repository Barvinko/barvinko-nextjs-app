import { createApi } from '@reduxjs/toolkit/query/react';
import { tmdbBaseQuery } from './tmdbBaseQuery';
import { TMDB, PopularMovies } from 'tmdb-ts';

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!apiKey) {
  throw new Error(
    'TMDB API key is missing. Add NEXT_PUBLIC_TMDB_API_KEY to .env'
  );
}

const tmdb = new TMDB(apiKey);

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: tmdbBaseQuery,
  endpoints: (builder) => ({
    searchMovies: builder.query<
      PopularMovies,
      { query: string; page?: number; language?: 'uk-UA' }
    >({
      query:
        ({ query, page = 1, language = 'uk-UA' }) =>
        () =>
          tmdb.search.movies({ query, page, language }),
    }),
    getPopularMovies: builder.query<
      PopularMovies,
      { page?: number; language?: 'uk-UA' }
    >({
      query:
        ({ page = 1, language = 'uk-UA' }) =>
        () =>
          tmdb.movies.popular({ page, language }),
    }),
  }),
});

export const { useSearchMoviesQuery, useGetPopularMoviesQuery } = tmdbApi;
