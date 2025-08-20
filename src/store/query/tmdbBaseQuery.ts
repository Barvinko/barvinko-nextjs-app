import type { BaseQueryFn } from '@reduxjs/toolkit/query';

interface TMDBError {
  status: 'CUSTOM_ERROR';
  data: { message: string };
}

type QueryExecutor<T> = () => Promise<T>;

export const tmdbBaseQuery: BaseQueryFn<
  QueryExecutor<unknown>,
  unknown,
  TMDBError
> = async (executor) => {
  try {
    const data = await executor();
    return { data };
  } catch (err) {
    return {
      error: {
        status: 'CUSTOM_ERROR',
        data: { message: (err as Error).message },
      },
    };
  }
};
