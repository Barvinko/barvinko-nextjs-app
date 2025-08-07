import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import {
  SearchAnimeDocument,
  SearchAnimeQuery,
  SearchAnimeQueryVariables,
  GetAnimeDetailsDocument,
  GetAnimeDetailsQuery,
  GetAnimeDetailsQueryVariables,
} from '../gql/graphql';

export const anilistApi = createApi({
  reducerPath: 'anilistApi',
  baseQuery: graphqlRequestBaseQuery({
    url: 'https://graphql.anilist.co',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchAnime: builder.query<SearchAnimeQuery, SearchAnimeQueryVariables>({
      query: (variables) => ({
        document: SearchAnimeDocument,
        variables,
      }),
    }),

    getAnimeDetails: builder.query<
      GetAnimeDetailsQuery,
      GetAnimeDetailsQueryVariables
    >({
      query: (variables) => ({
        document: GetAnimeDetailsDocument,
        variables,
      }),
    }),
  }),
});

export const { useSearchAnimeQuery, useGetAnimeDetailsQuery } = anilistApi;
