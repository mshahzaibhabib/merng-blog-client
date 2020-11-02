import React from 'react';
// here what we are going to export is a Apollo provider that wraps the application, the entire app.
// so we need to import the App in to this provider
import App from './App';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client'
import { setContext } from 'apollo-link-context';


const httpLink = createHttpLink({
    // this will point to the graphql server
    uri: "https://shielded-fortress-99406.herokuapp.com/"
});

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
});

const client = new ApolloClient({
    connectToDevTools: true,
    link: authLink.concat(httpLink),
    // cache value that will store any cached data 
    cache: new InMemoryCache()
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);