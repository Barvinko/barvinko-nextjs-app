import { createApi } from '@reduxjs/toolkit/query/react';
import { tmdbBaseQuery } from './tmdbBaseQuery';
import { TMDB, PopularMovies, MovieDetails } from 'tmdb-ts';

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
    getMovies: builder.query<
      PopularMovies,
      { query?: string; page?: number; language?: 'en-US' }
    >({
      query:
        ({ query, page = 1, language = 'en-US' }) =>
        () => {
          if (query && query.trim()) {
            return tmdb.search.movies({ query, page, language });
          }
          return tmdb.movies.popular({ page, language });
        },
    }),
    getDetails: builder.query<MovieDetails, { id: number }>({
      query:
        ({ id }) =>
        () => {
          return tmdb.movies.details(id);
        },
    }),
  }),
});

export const { useGetMoviesQuery, useGetDetailsQuery } = tmdbApi;
