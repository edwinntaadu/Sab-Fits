import { ApolloClient, InMemoryCache } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { setContext } from '@apollo/client/link/context';
import paginationField from './paginationField';
import { endpoint, prodEndpoint } from '@/config';

const uploadLink = createUploadLink({
  uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
  fetchOptions: {
    credentials: 'include',
  },
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  console.log('Token:', token); 
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
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
