import { createApi } from '@reduxjs/toolkit/query/react';
import { tmdbBaseQuery } from './tmdbBaseQuery';
import { PopularMovies } from 'tmdb-ts';

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: tmdbBaseQuery,
  endpoints: (builder) => ({
    // searchMovies: builder.query({
    //   async queryFn({ query, page = 1, language = 'uk-UA' }) {
    //     try {
    //       const data = await tmdb.search.movies({ query, page, language });
    //       return { data };
    //     } catch (error: any) {
    //       if (error instanceof Error) {
    //         return { error: { message: error.message } };
    //       }
    //       return { error: { message: 'Unknown error' } };
    //     }
    //   },
    // }),
    getPopularMovies: builder.query<
      PopularMovies,
      { page?: number; language?: 'uk-UA' }
    >({
      query: ({ page = 1, language = 'uk-UA' }) => ({
        type: 'popular',
        page,
        language,
      }),
    }),
  }),
});

export const { useGetPopularMoviesQuery } = tmdbApi;
