import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_TMDB_API_URL,
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchMovies: builder.query({
      query: ({ query, page = 1, language = 'uk-UA' }) =>
        `/search/movie?query=${encodeURIComponent(query)}&page=${page}&language=${language}`,
    }),
    getPopularMovies: builder.query({
      query: ({ page = 1, language = 'uk-UA' }) =>
        `/movie/popular?page=${page}&language=${language}`,
    }),
  }),
});

export const { useSearchMoviesQuery, useGetPopularMoviesQuery } = tmdbApi;
