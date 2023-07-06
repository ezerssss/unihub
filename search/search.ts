import algoliasearch from 'algoliasearch';

export const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID ?? '',
  process.env.ALGOLIA_API_KEY ?? ''
);

export const searchIndex = searchClient.initIndex(
  process.env.ALGOLIA_INDEX_NAME ?? ''
);
