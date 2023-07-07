import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: 'http://localhost:3000/graphql',
})

// Cache implementation
const cache = new InMemoryCache({ addTypename: false })

// Create the apollo client
export const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})
