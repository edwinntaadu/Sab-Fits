import NProgress from 'nprogress';
import Router from 'next/router';
import Page from "@/components/Page";
import '../components/styles/nprogress.css';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';



Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3000/api/graphql',
    credentials: 'same-origin', // include, same-origin
  }),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Page>
       <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default MyApp;