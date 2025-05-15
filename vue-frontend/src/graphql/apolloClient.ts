import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
const API_URL = import.meta.env.VITE_API_URL;

const httpLink = createHttpLink({
    uri: API_URL,
})

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})

export default apolloClient