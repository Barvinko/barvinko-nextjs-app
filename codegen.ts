import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://graphql.anilist.co',
  documents: ['src/**/*.graphql'],
  generates: {
    './src/gql/': {
      preset: 'client',
      presetConfig: {
        client: 'react-query',
        addons: ['typescript-react-query'],
        graphqlRequestClient: {
          skip: false,
        },
      },
    },
  },
};
export default config;
