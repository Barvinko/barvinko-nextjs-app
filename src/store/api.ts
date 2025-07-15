import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResponseStarWars, Character } from '@/src/types/types';

export const starWarsApi = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.py4e.com/api/people/' }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      ResponseStarWars,
      { name: string; page: number }
    >({
      query: ({ name, page }) => `?search=${name}&page=${page}`,
    }),
    getDetails: builder.query<Character, { id: string }>({
      query: ({ id }) => id,
    }),
  }),
});

export const { useGetCharactersQuery, useGetDetailsQuery } = starWarsApi;
