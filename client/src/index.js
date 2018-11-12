import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom';
import { setContext } from 'apollo-link-context';

import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { AUTH_TOKEN } from './constants';

// Adds the token to requests
const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

// Creates a link the GraphQL instance
const apollo_http_link = createHttpLink({
  uri: `http://${window.location.hostname}:9090`
})

// Creates the client used for mutations and queries
const client = new ApolloClient({
  link: authLink.concat(apollo_http_link),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
