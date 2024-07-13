import { ApolloClient, InMemoryCache } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error'; // Import onError for error handling
import paginationField from './paginationField';
import { endpoint, prodEndpoint } from '@/config';

// Create the upload link
const uploadLink = createUploadLink({
  uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
  fetchOptions: {
    credentials: 'include',
  },
});

// Create the auth link to handle authentication
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'x-apollo-operation-name': 'operation-name',
      'Content-Type': 'application/json',
    }
  };
});

// Create the error link to handle errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}. Backend is unreachable. Is it running?`);
  }
});

// Combine the links
const link = errorLink.concat(authLink).concat(uploadLink);

// Create the Apollo Client
const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: paginationField(),
        },
      },
    },
  }),
});

export default client;
