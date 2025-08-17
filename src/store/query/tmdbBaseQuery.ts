import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { TMDB, type PopularMovies } from 'tmdb-ts';

type TMDBError = {
  status: 'CUSTOM_ERROR';
  data: {
    message: string;
  };
};

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!apiKey) {
  throw new Error(
    'TMDB API key is missing. Add NEXT_PUBLIC_TMDB_API_KEY to .env'
  );
}

const tmdb = new TMDB(apiKey);

export const tmdbBaseQuery: BaseQueryFn<
  { type: 'popular'; page?: number; language?: 'uk-UA' },
  PopularMovies,
  TMDBError
> = async ({ type, page = 1, language = 'uk-UA' }) => {
  try {
    if (type === 'popular') {
      const data = await tmdb.movies.popular({ page, language });
      return { data };
    }

    return {
      error: {
        status: 'CUSTOM_ERROR',
        data: { message: `Unsupported query type: ${type}` },
      },
    };
  } catch (err) {
    return {
      error: {
        status: 'CUSTOM_ERROR',
        data: { message: (err as Error).message },
      },
    };
  }
};
