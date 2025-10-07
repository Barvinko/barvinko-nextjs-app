// src/store/query/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PopularMovies, MovieDetails } from 'tmdb-ts';

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!apiKey) {
  throw new Error(
    'TMDB API key is missing. Add NEXT_PUBLIC_TMDB_API_KEY to .env'
  );
}

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${apiKey}`);
      headers.set('accept', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<
      PopularMovies,
      { query?: string; page?: number; language?: string }
    >({
      query: ({ query, page = 1, language = 'en-US' }) => {
        if (query && query.trim()) {
          return {
            url: '/search/movie',
            params: { query, page, language },
          };
        }
        return {
          url: '/movie/popular',
          params: { page, language },
        };
      },
    }),
    getDetails: builder.query<MovieDetails, { id: number }>({
      query: ({ id }) => `/movie/${id}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetDetailsQuery } = tmdbApi;
