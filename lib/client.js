import { ApolloClient, InMemoryCache } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import paginationField from './paginationField';

const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  headers: {
    'x-apollo-operation-name': 'UploadFile',
  },
});

const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: paginationField(),
        }
      }
    }
  }),
});

export default client;
